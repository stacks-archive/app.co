import React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'
import Head from '@containers/head'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { Page } from '@components/page'
import { Type, Field, Flex, Box, Button } from 'blockstack-ui'
import { selectAppConstants, selectApiServer } from '@stores/apps/selectors'
import { string, boolean } from 'yup'
import { FormSection, ErrorMessage, Bar, sections as getSections } from '@containers/submit'
import debounce from 'lodash.debounce'
import UserStore from '@stores/user'

import { trackEvent } from '@utils'

const APP_SUBMISSION_DATA = 'app_submission_data'

const outerHandleChange = (e) => (setState) => {
  if (e && e.persist) e.persist()
  setState((s) => ({
    ...s,
    values: {
      ...s.values,
      [e.target.name]: e.target.value
    }
  }))
}

const Submit = ({ appConstants, setState, state, errors, submit, user, loading, signIn, isAppMiningEligible }) => {
  const sections = getSections(user, appConstants)

  const validate = async () => {
    let errorsObj = {}
    let errorCount = 0
    await Promise.all(
      sections.map(async (section) =>
        Promise.all(
          section.fields.map(async (field) => {
            const isBool = field.type === 'radio' || field.type === 'checkbox'
            const value = state[field.name]
            if (isBool && field.required && !value) {
              errorsObj = {
                ...errorsObj,
                [field.name]: 'This is required.'
              }
              errorCount += 1
            } else if (field.validation) {
              try {
                await field.validation.validate(value)
              } catch (e) {
                errorsObj = {
                  ...errorsObj,
                  [field.name]: e.errors[0]
                }
                errorCount += 1
              }
            }
          })
        )
      )
    )
    return {
      count: errorCount,
      errors: errorsObj
    }
  }

  const handleValidation = async (e) => {
    if (e) e.preventDefault()
    const validation = await validate()
    if (validation.count > 0) {
      trackEvent('App Submission Page - Validation Errors')
      setState(() => ({
        errorCount: validation.count,
        errors: validation.errors
      }))
    } else {
      setState(() => ({
        errorCount: null,
        errors: {}
      }))
      submit()
    }
  }

  const blockstackAuth = (e) => {
    if (e) { e.preventDefault() }
    localStorage.setItem(APP_SUBMISSION_DATA, JSON.stringify(state))
    signIn('submit')
  }

  return (
    <Box mx="auto" maxWidth={700}>
      <Type is="h2">Add an app to App.co</Type>
      <Type is="p" lineHeight={1.5}>
        Add any user-ready decentralized app: It could be an app you built, or an app you discovered. We manually
        verify all information before publishing to App.co. Contact details are not displayed and we promise to keep
        your information private and safe.
      </Type>
      <Bar mb={0} />
      {user && user.user && (
        <Flex pt={6}>
          <Box mb={4} width={1}>
            <Field.LabelAdvanced
              labelProps={{
                pb: 3
              }}
              pl={0}
              required
              label="Blockstack ID"
            />
            <Box px={3} py={4} borderRadius={3} border="1px solid gray" display="inline-block">
              {user.user.blockstackUsername}
            </Box>
            <Type fontSize={1} display="block" mt={3}>
              You will use your ID to make changes to your app, and remove or modify it&apos;s listing in the future.
            </Type>
          </Box>
        </Flex>
      )}
      <Flex flexWrap="wrap" pt={6} flexDirection="column">
        <form noValidate onSubmit={handleValidation}>
          {sections.map((section) => (
            <>
              <FormSection
                errors={errors}
                handleChange={outerHandleChange}
                setState={setState}
                key={`section-${section.fields[0].name}`}
                message={section.message}
                fields={section.fields}
                state={state}
              />
              <Bar />
            </>
          ))}
          {errors ? <ErrorMessage /> : null}
          {isAppMiningEligible && !(user && user.jwt) ? (
            <Button onClick={blockstackAuth}>{loading ? 'Loading...' : 'Login with Blockstack'}</Button>
          ) : (
            <Button>{loading ? 'Loading...' : 'Submit App'}</Button>
          )}
        </form>
      </Flex>
    </Box>
  )
}

const getValues = () => {
  if (typeof localStorage !== 'undefined') {
    const appDataJSON = localStorage.getItem(APP_SUBMISSION_DATA)
    if (appDataJSON) {
      const appData = JSON.parse(appDataJSON)
      console.log('from localStorage', appData)
      // localStorage.removeItem(APP_SUBMISSION_DATA)
      return appData
    }
  }
  return {}
}

class SubmitDapp extends React.Component {
  state = {
    values: getValues(),
    loading: false,
    success: false,
    errors: {},
    referralCode: null,
    refSource: null,
    accessToken: null
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      trackEvent('App Submission Page - Page Load')
      this.setStateFromData()
    }
  }

  componentDidMount() {
    this.props.handleSignIn(this.props.apiServer)
  }

  setStateFromData() {
    const { search } = document.location
    if (search) {
      const refPart = search.match(/referralCode=(\w+)/)
      if (refPart) {
        const referralCode = refPart[1]
        const refSource = search.match(/refSource=(\w+)/)[1]
        this.setState({
          referralCode,
          refSource
        })
      }
    }
  }
  
  setStateFromLocalStorage = () => {
    const appDataJSON = localStorage.getItem(APP_SUBMISSION_DATA)
    if (appDataJSON) {
      const appData = JSON.parse(appDataJSON)
      console.log('from localStorage', appData)
      localStorage.removeItem(APP_SUBMISSION_DATA)
      return {
        values: appData
      }
    }
    return {}
  }

  submit = async () => {
    const { apiServer, user } = this.props
    const url = `${apiServer}/api/submit`
    this.setState({ loading: true })

    /**
     * Clean twitter handle of @ sign
     */
    let twitterHandle = this.state.values && this.state.values.twitterHandle
    if (twitterHandle && twitterHandle.includes('@')) {
      twitterHandle = twitterHandle.replace('@', '')
    }

    const { referralCode, refSource } = this.state
    const values = {
      ...this.state.values,
      twitterHandle,
      referralCode,
      refSource
    }

    try {
      const headers = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
      if (user && user.jwt) {
        headers.Authorization = `Bearer ${user.jwt}`
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(values)
      })
      const { app } = await response.json()
      trackEvent('App Submission Page - Submission Success')
      this.setState({ success: true, loading: false, accessToken: app.accessToken })
    } catch (e) {
      trackEvent('App Submission Page - Submission Error')
      this.setState({ success: false, loading: false })
      console.error(e.message)
    }
  }

  makerPortalURL() {
    const { accessToken } = this.state
    return `/maker/${accessToken}`
  }

  appMiningEligible() {
    const { values } = this.state
    console.log(values)
    return values.authentication === 'Blockstack' && values.category !== "Sample Blockstack Apps"
  }

  render() {
    const { appConstants } = this.props
    const { accessToken } = this.state

    return (
      <Page>
        <Head title="Submit your dapp" description="Submit your dapp to be listed on the Universal Dapp Store." />
        <Page.Section wrap p={['32px', '64px']} mb={3} richText bg="white">
          {this.state.success ? (
            <>
              <Box width="100%" textAlign="center">
                <Box pb={6} width="100%">
                  <Type mx="auto" fontSize={5} fontWeight="bold">
                    Success!
                  </Type>
                </Box>
                <Box mx="auto">
                  <Type display="block">Thanks for your submission! We&apos;ll get back to you soon.</Type>
                  {this.appMiningEligible() && (
                    <>
                      <Type mt={2} display="block">You can update your app details using this magic link. Don&apos;t share this URL!</Type>
                      <Link
                        href={{
                          pathname: '/maker',
                          query: {
                            accessToken
                          }
                        }}
                        as={this.makerPortalURL()}
                        passHref
                      >
                        <Type mt={2} is="a" display="block">{document.location.origin}{this.makerPortalURL()}</Type> 
                      </Link>
                    </>
                  )}
                </Box>
                <Box pt={6}>
                  <Button is="a" href="/" color="white !important">
                    Back Home
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Submit
              loading={this.state.loading}
              submit={this.submit}
              success={this.state.success}
              appConstants={appConstants}
              setState={debounce((args) => this.setState(args), 100)}
              state={this.state.values}
              errors={this.state.errorCount > 0 && this.state.errors}
              signIn={this.props.signIn}
              user={this.props.user}
              isAppMiningEligible={this.appMiningEligible()}
            />
          )}
        </Page.Section>
      </Page>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, UserStore.actions), dispatch)
}

const mapStateToProps = (state) => ({
  appConstants: selectAppConstants(state),
  apiServer: selectApiServer(state),
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitDapp)

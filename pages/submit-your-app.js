import React from 'react'
import 'isomorphic-unfetch'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Type, Field, Flex, Box } from 'blockstack-ui'
import debounce from 'lodash.debounce'

import Head from '@containers/head'
import { MakerTitle, MakerCardHeader, MakerButton } from '@components/maker/styled'
import { Page } from '@components/page'
import { selectAppConstants, selectApiServer } from '@stores/apps/selectors'
import { FormSection, ErrorMessage, sections as getSections } from '@containers/submit'
import SuccessCard from '@components/submit'
import UserStore from '@stores/user'

import { trackEvent } from '@utils/index'

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
      <MakerTitle pt="20px">Submit your app</MakerTitle>
      <MakerCardHeader>Personal details</MakerCardHeader>
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
          {sections.map(section => (
            <FormSection
              errors={errors}
              handleChange={outerHandleChange}
              setState={setState}
              key={`section-${section.fields[0].name}`}
              message={section.message}
              fields={section.fields}
              state={state}
            />
          ))}
          {errors ? <ErrorMessage /> : null}
          {!(user && user.jwt) ? (
            <>
              <Field.Message maxWidth={400} lineHeight={1.5} mb={3}>
                To submit your app, first login with Blockstack. You&apos;ll be able to use your Blockstack ID to manage your app&apos;s listing.
              </Field.Message>
              <MakerButton onClick={blockstackAuth}>{loading ? 'Loading...' : 'Login with Blockstack'}</MakerButton>
            </>
          ) : (
            <MakerButton>{loading ? 'Loading...' : 'Submit App'}</MakerButton>
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

  componentDidMount() {
    const queries = document.location.search
    if (queries) {
      const referralCode = queries.match(/referralCode=(\w+)/)[1]
      const refSource = queries.match(/refSource=(\w+)/)[1]
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        referralCode,
        refSource
      })
    }
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

  submit = async () => {
    const url = `${this.props.apiServer}/api/submit`
    this.setState({ loading: true })

    /**
     * Clean twitter handle of @ sign
     */
    let twitterHandle = this.state.values && this.state.values.twitterHandle
    if (twitterHandle && twitterHandle.includes('@')) {
      twitterHandle = twitterHandle.replace('@', '')
    }

    const values = {
      ...this.state.values,
      twitterHandle,
      referralCode: this.state.referralCode,
      refSource: this.state.refSource
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
      const resData = await response.json()
      trackEvent('App Submission Page - Submission Success')
      this.setState({ success: true, loading: false, accessToken: resData.app.accessToken })
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

    return (
      <Page innerPadding={0} pt={0} background="white" fullHeight>
        <Head title="Submit your dapp" description="Submit your dapp to be listed on the Universal Dapp Store." />
        <Page.Section p={['32px', '64px']} mb={3} bg="white">
          {
            this.state.success
              ? <SuccessCard isAppMiningEligible={this.appMiningEligible()} />
              : (
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
                )
            }
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

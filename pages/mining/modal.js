import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Focus, Input as InputPowerplug, Compose } from 'react-powerplug'
import { Spring, animated } from 'react-spring'
import CloseIcon from 'mdi-react/CloseIcon'
import AlertBoxIcon from 'mdi-react/AlertBoxIcon'
import CheckboxBlankCircleOutlineIcon from 'mdi-react/CheckboxBlankCircleOutlineIcon'
import CheckboxMarkedCircleOutlineIcon from 'mdi-react/CheckboxMarkedCircleOutlineIcon'
import { Fixed } from 'rebass'

import { object, string, bool } from 'yup'

import { HeaderType } from '@pages/mining/shared'
import { Box, Flex, Input as SystemInput } from '@components/mining'
import { Type } from 'blockstack-ui'
import { MiningButton } from '@components/mining/button'
import { trackEvent } from '@utils'

import MiningActions from '@stores/mining/actions'
import { selectApiServer } from '@stores/apps/selectors'

const Input = ({ focused, ...props }) => (
  <SystemInput
    border={0}
    p={2}
    bg="transparent"
    borderBottom={`1px solid rgba(255,255,255, ${focused ? 1 : 0.3})`}
    minWidth={['100%']}
    color="white"
    style={{ outline: 'none' }}
    {...props}
  />
)

const CloseButton = ({ ...rest }) => (
  <Box position="absolute" top={['55px', '35px']} right="20px" {...rest}>
    <CloseIcon color="white" />
  </Box>
)

const Checkbox = ({ label, active, ...props }) => {
  const Icon = active ? CheckboxMarkedCircleOutlineIcon : CheckboxBlankCircleOutlineIcon
  const color = active ? 'white' : 'rgba(255,255,255,0.25)'
  return (
    <Flex
      alignItems="center"
      mt={3}
      style={{
        cursor: 'pointer',
        userSelect: 'none'
      }}
      {...props}
    >
      <Box mr={2}>
        <Icon size={18} color={color} />
      </Box>
      <Type color="rgba(255,255,255,0.5)">{label}</Type>
    </Flex>
  )
}

const Label = ({ ...props }) => <Type color="white" fontWeight={400} fontSize={1} mb={2} {...props} />

const AnimatedLabel = ({ focused, position = 'absolute', ...props }) => (
  <Spring native from={{ top: 7, opacity: 0.5 }} to={{ top: focused ? -17 : 7, opacity: focused ? 1 : 0.5 }}>
    {(styles) => (
      <Box
        is={animated.div}
        style={{
          ...styles,
          pointerEvents: 'none'
        }}
        native
        position={position}
      >
        <Label {...props} />
      </Box>
    )}
  </Spring>
)

const InputGroup = ({ name, label, type, placeholder, onChange, value, autoFocus, ...rest }) => (
  <Compose components={[Focus, InputPowerplug]}>
    {(focus) => (
      <Box mb="35px" position="relative" {...rest}>
        {label ? <AnimatedLabel focused={focus.focused || value}>{label}</AnimatedLabel> : null}
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          focused={focus.focused}
          onChange={onChange}
          value={value}
          required
          {...focus.bind}
        />
      </Box>
    )}
  </Compose>
)

const BackDrop = ({ ...rest }) => (
  <Flex
    position="fixed"
    zIndex={200}
    left={0}
    right={0}
    top={0}
    bottom={0}
    bg="rgba(0,0,0,0.5)"
    alignItems="center"
    justifyContent="center"
    {...rest}
  />
)

const ModalContainer = ({ ...rest }) => (
  <Box
    bg="#212d37"
    minHeight={['100vh', '0']}
    minWidth={['100%', '650px']}
    borderRadius={8}
    p={4}
    style={{
      overflow: 'auto'
    }}
    position="relative"
    maxHeight="100vh"
    zIndex={205}
    {...rest}
  />
)

const emptyValue = (value) => !value || value === ''

const Radios = ({ title, options, name, handleChange, state, ...rest }) => (
  <Box {...rest}>
    <Label>{title}</Label>
    <Box onClick={() => handleChange(name, true)}>
      <Checkbox label={options[0]} active={state[name] === true} />
    </Box>
    <Box onClick={() => handleChange(name, false)}>
      <Checkbox label={options[1]} active={state[name] === false} />
    </Box>
  </Box>
)

class MiningModalComponent extends React.PureComponent {
  state = {
    isBlockstackIntegrated: true,
    appIsPublic: true,
    firstName: null,
    lastName: null,
    email: null,
    appName: null,
    website: null,
    repo: null,
    error: null
  }
  schema = object().shape({
    repo: string()
      .url("Looks like the URL for your Public Repository isn't formatted correctly!")
      .nullable(),
    appIsPublic: bool().required(),
    isBlockstackIntegrated: bool().required(),
    website: string()
      .nullable()
      .url('Please make sure your website URL is formatted correctly.')
      .required('Please provide a website URL for your dApp.'),
    email: string()
      .nullable()
      .email()
      .required('Please provide an email address we can reach you at.'),
    appName: string()
      .required('Please provide the name of your dApp')
      .nullable(),
    lastName: string()
      .required('Please provide a Last Name.')
      .nullable(),
    firstName: string()
      .required('Please provide a First Name.')
      .nullable()
  })

  componentDidMount() {
    document.body.classList.add('no-scroll')
  }

  componentWillUnmount() {
    document.body.classList.remove('no-scroll')
  }

  handleChange = (key, value) => this.setState({ [key]: value })

  closeModal = async () => {
    const { error, website, repo, ...rest } = this.state

    const supportUrlsWithoutHttp = (url) => url && (url.includes('.') && !url.includes('http') ? `http://${url}` : url)

    const submission = {
      ...rest,
      repo: supportUrlsWithoutHttp(repo),
      website: supportUrlsWithoutHttp(website)
    }

    if (error) {
      this.setState({
        error: null
      })
    }

    let valid = false
    try {
      valid = await this.schema.validate(submission)
    } catch (e) {
      if (e.errors && e.errors.length) {
        return this.setState({ error: e.errors[0] })
      }
    }

    if (valid) {
      trackEvent('App Mining Registered', {
        event_category: 'Mining'
      })
      return this.props.submitApp(submission, this.props.apiServer)
    }
    return this.setState({ error: 'Please make sure all fields are filled in correctly.' })
  }

  render() {
    return (
      <BackDrop>
        <ModalContainer>
          <CloseButton onClick={() => this.props.closeModal()} />
          <Flex flexDirection="column" mb={4} mt={[4, 2]}>
            <HeaderType mb={2} fontSize={4}>
              Submit your app for qualification
            </HeaderType>
            {this.state.error ? (
              <Flex
                mt={2}
                alignItems="center"
                borderRadius={3}
                borderColor="rgba(255,255,255,0.1)"
                border="1px solid"
                p={3}
              >
                <AlertBoxIcon color="#EF6F6F" />
                <Type fontSize={1} pl={3} color="white">
                  {this.state.error}
                </Type>
              </Flex>
            ) : null}
            {this.props.submitting ? <Type color="white">Submitting your app...</Type> : null}
            {this.props.submitted && (
              <Type color="white">Your app has been submitted! We'll contact you to follow up.</Type>
            )}
          </Flex>
          {!this.props.submitted && !this.props.submitting ? (
            <>
              <Flex width={1} flexDirection={['column', 'row']}>
                <InputGroup
                  label="First Name"
                  name="first-name"
                  flex="1 1 auto"
                  mr={[0, 2]}
                  autoFocus
                  value={this.state.firstName}
                  onChange={({ target: { value } }) => this.handleChange('firstName', value)}
                />
                <InputGroup
                  label="Last Name"
                  name="last-name"
                  flex="1 1 auto"
                  ml={[0, 3]}
                  value={this.state.lastName}
                  onChange={({ target: { value } }) => this.handleChange('lastName', value)}
                />
              </Flex>
              <InputGroup
                label="Your Email Address"
                name="email"
                type="email"
                value={this.state.email}
                onChange={({ target: { value } }) => this.handleChange('email', value)}
              />
              <InputGroup
                label="Name of your dApp"
                name="dapp-name"
                value={this.state.appName}
                onChange={({ target: { value } }) => this.handleChange('appName', value)}
              />
              <InputGroup
                label="dApp Website"
                name="dapp-website"
                type="url"
                value={this.state.website}
                onChange={({ target: { value } }) => this.handleChange('website', value)}
              />
              <InputGroup
                label="Public Repository (GitHub, etc)*"
                name="repo"
                type="url"
                value={this.state.repo}
                onChange={({ target: { value } }) => this.handleChange('repo', value)}
              />
              <Radios
                title="Does your app have Blockstack Auth integrated?"
                options={[
                  'Yes, Blockstack Auth is implemented.',
                  'No, currently working to implement Blockstack Auth.'
                ]}
                name="isBlockstackIntegrated"
                state={this.state}
                handleChange={this.handleChange}
              />
              <Radios
                title="Is your app publicly available?"
                options={['Yes.', 'No.']}
                name="appIsPublic"
                state={this.state}
                handleChange={this.handleChange}
                pt={4}
              />
              <Flex pt={4}>
                <MiningButton onClick={() => this.closeModal()}>Submit</MiningButton>
              </Flex>
              <Type pt={4} fontSize={1} opacity={0.75}>
                * Optional Field
              </Type>
            </>
          ) : null}
        </ModalContainer>
        <Fixed left={0} zIndex={201} right={0} top={0} bottom={0} onClick={() => this.props.closeModal()} />
      </BackDrop>
    )
  }
}

const mapStateToProps = (state) => ({
  submitting: state.mining.isSubmitting,
  submitted: state.mining.hasSubmitted,
  apiServer: selectApiServer(state)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, MiningActions), dispatch)
}

const MiningModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(MiningModalComponent)

export { MiningModal }

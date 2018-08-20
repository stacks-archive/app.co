import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Focus, Input as InputPowerplug, Compose } from 'react-powerplug'
import { Spring } from 'react-spring'
import CloseIcon from 'mdi-react/CloseIcon'
import CheckboxBlankCircleOutlineIcon from 'mdi-react/CheckboxBlankCircleOutlineIcon'
import CheckboxMarkedCircleOutlineIcon from 'mdi-react/CheckboxMarkedCircleOutlineIcon'
import { Fixed } from 'rebass'

import { HeaderType } from '@pages/mining/shared'
import { Box, Flex, Input as SystemInput } from '@components/mining'
import { Type } from '@components/typography'
import { MiningButton } from '@components/mining/button'

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
      <Type.span color="rgba(255,255,255,0.5)">{label}</Type.span>
    </Flex>
  )
}

const Label = ({ ...props }) => <Type.h5 color="white" fontWeight={400} mb={2} {...props} />

const AnimatedLabel = ({ focused, position = 'absolute', ...props }) => (
  <Spring native from={{ top: 7, opacity: 0.5 }} to={{ top: focused ? -17 : 7, opacity: focused ? 1 : 0.5 }}>
    {(styles) => (
      <Box
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
    {(focus) =>
      (
        <Box mb="35px" position="relative" {...rest}>
          {label ? <AnimatedLabel focused={focus.focused || value !== ''}>{label}</AnimatedLabel> : null}
          <Input
            name={name}
            type={type}
            placeholder={placeholder}
            autoFocus={autoFocus}
            focused={focus.focused}
            onChange={onChange}
            value={value}
            {...focus.bind}
          />
        </Box>
      )
    }
  </Compose>
)

class MiningModalComponent extends React.PureComponent {
  state = {
    isBlockstackIntegrated: 'yes',
    firstName: '',
    lastName: '',
    email: '',
    appName: '',
    website: ''
  }
  componentDidMount() {
    document.body.classList.add('no-scroll')
  }

  componentWillUnmount() {
    document.body.classList.remove('no-scroll')
  }

  closeModal() {
    // console.log(this.state)
    const submission = {
      ...this.state,
      isBlockstackIntegrated: this.state.isBlockstackIntegrated === 'yes'
    }
    // console.log(submission)
    this.props.submitApp(submission, this.props.apiServer)
    // this.props.closeModal()
  }

  render() {
    return (
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
      >
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
        >
          <Box position="absolute" top="35px" right="20px" onClick={() => this.props.closeModal()}>
            <CloseIcon color="white" />
          </Box>
          <HeaderType mb={5} fontSize={4}>
            Register for App Mining
          </HeaderType>
          {this.props.submitting && (
            <Type.p color="white">Submitting your app...</Type.p>
          )}
          {this.props.submitted && (
            <Type.p color="white">Your app has been submitted! We'll contact you to follow up.</Type.p>
          )}
          {!this.props.submitted && !this.props.submitting && (
            <div>
              <Flex width={1} flexDirection={['column', 'row']}>
                <InputGroup label="First Name" name="first-name" flex="1 1 auto" mr={[0, 2]} autoFocus
                  value={this.state.firstName}
                  onChange={(evt) => this.setState({ firstName: evt.target.value })}
                />
                <InputGroup label="Last Name" name="last-name" flex="1 1 auto" ml={[0, 3]}
                  value={this.state.lastName}
                  onChange={(evt) => this.setState({ lastName: evt.target.value })}
                />
              </Flex>
              <InputGroup label="Your Email Address" name="email" type="email"
                value={this.state.email}
                onChange={(evt) => this.setState({ email: evt.target.value })}
              />
              <InputGroup label="Name of your dApp" name="dapp-name"
                value={this.state.appName}
                onChange={(evt) => this.setState({ appName: evt.target.value })}
              />
              <InputGroup label="dApp Website" name="dapp-website" type="url"
                value={this.state.website}
                onChange={(evt) => this.setState({ website: evt.target.value })}
              />
              <Label>Does your app have Blockstack Auth integrated?</Label>
              <Box onClick={() => this.setState({ isBlockstackIntegrated: 'yes' })}>
                <Checkbox label="Yes" active={this.state.isBlockstackIntegrated === 'yes'} />
              </Box>
              <Box onClick={() => this.setState({ isBlockstackIntegrated: 'no' })}>
                <Checkbox label="No" active={this.state.isBlockstackIntegrated === 'no'} />
              </Box>
              <Flex pt={4}>
                <MiningButton onClick={() => this.closeModal()}>Submit</MiningButton>
              </Flex>
            </div>
          )}
        </Box>
        <Fixed left={0} zIndex={201} right={0} top={0} bottom={0} onClick={() => this.props.closeModal()} />
      </Flex>
    )
  }
}

const mapStateToProps = state => ({
  submitting: state.mining.isSubmitting,
  submitted: state.mining.hasSubmitted,
  apiServer: selectApiServer(state)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, MiningActions), dispatch)
}

const MiningModal = connect(mapStateToProps, mapDispatchToProps)(MiningModalComponent)

export { MiningModal }

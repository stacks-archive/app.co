import * as React from 'react'
import { Box, Flex, Input as SystemInput } from '@components/mining'
import { HeaderType } from '@pages/mining/shared'
import { Type } from '@components/typography'
import { Focus, Input as InputPowerplug, Compose } from 'react-powerplug'
import { Spring } from 'react-spring'
import CloseIcon from 'mdi-react/CloseIcon'
import CheckboxBlankCircleOutlineIcon from 'mdi-react/CheckboxBlankCircleOutlineIcon'
import CheckboxMarkedCircleOutlineIcon from 'mdi-react/CheckboxMarkedCircleOutlineIcon'
import { MiningButton } from '@components/mining/button'
import { Fixed } from 'rebass'

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

const InputGroup = ({ name, label, type, placeholder, autoFocus, ...rest }) => (
  <Compose components={[Focus, InputPowerplug]}>
    {(focus, input) =>
      console.log(input.value) || (
        <Box mb="35px" position="relative" {...rest}>
          {label ? <AnimatedLabel focused={focus.focused || input.value !== ''}>{label}</AnimatedLabel> : null}
          <Input
            name={name}
            type={type}
            placeholder={placeholder}
            autoFocus={autoFocus}
            focused={focus.focused}
            {...focus.bind}
            {...input.bind}
          />
        </Box>
      )
    }
  </Compose>
)

class MiningModal extends React.PureComponent {
  state = {
    selected: 'yes'
  }
  componentDidMount() {
    document.body.classList.add('no-scroll')
  }

  componentWillUnmount() {
    document.body.classList.remove('no-scroll')
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
          <Flex width={1} flexDirection={['column', 'row']}>
            <InputGroup label="First Name" name="first-name" flex="1 1 auto" mr={[0, 2]} autoFocus />
            <InputGroup label="Last Name" name="last-name" flex="1 1 auto" ml={[0, 3]} />
          </Flex>
          <InputGroup label="Your Email Address" name="email" type="email" />
          <InputGroup label="Name of your dApp" name="dapp-name" />
          <InputGroup label="dApp Website" name="dapp-website" type="url" />
          <Label>Does your app have Blockstack Auth integrated?</Label>
          <Box onClick={() => this.setState({ selected: 'yes' })}>
            <Checkbox label="Yes" active={this.state.selected === 'yes'} />
          </Box>
          <Box onClick={() => this.setState({ selected: 'no' })}>
            <Checkbox label="No" active={this.state.selected === 'no'} />
          </Box>
          <Flex pt={4}>
            <MiningButton>Submit</MiningButton>
          </Flex>
        </Box>
        <Fixed left={0} zIndex={201} right={0} top={0} bottom={0} onClick={() => this.props.closeModal()} />
      </Flex>
    )
  }
}

export { MiningModal }

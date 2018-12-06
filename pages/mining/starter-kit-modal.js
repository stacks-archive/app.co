import React from 'react'
import { Modal, Flex, Type, Input, Box, Button } from 'blockstack-ui'
import { State } from 'react-powerplug'
import { BuildGraphic, RegisterGraphic } from '@components/mining/svg'
import { Newsletter } from '@components/mining/newsletter'

const ModalComponent = (props) => (
  <Flex position="relative" maxWidth={600} width={'100%'} p={4} flexDirection="column" bg="white" {...props} />
)
const header = (props) => (
  <Flex
    minWidth={600}
    p={4}
    position="absolute"
    right={0}
    top={0}
    flexDirection="row"
    justifyContent="flex-end"
    width={48}
    {...props}
  />
)

const InitialView = ({ handleSubmit }) => (
  <>
    <Type color="blue" lineHeight={1.5} maxWidth="80%" fontSize={5} fontFamily="brand">
      Get your App Mining Starter Kit
    </Type>
    <Box pt={4}>
      <Box>
        <Newsletter hideButton variant="ui" placeholder="Enter your email address">
          {({ doSubmit, component: Component, isValid }) => {
            return (
              <>
                <Component />
                <Box pt={5}>
                  <Button
                    disabled={!isValid}
                    onClick={() => {
                      console.log('submit')
                      doSubmit()
                    }}
                    width={1}
                    height="auto"
                    py={2}
                  >
                    Submit
                  </Button>
                </Box>
              </>
            )
          }}
        </Newsletter>
      </Box>
    </Box>
  </>
)

const SuccessView = ({ email = 'PLACEHOLDER@email.com' }) => (
  <Box color="blue.dark" lineHeight={1.35}>
    <Box pb={6}>
      <Type fontSize={3}>
        <Type fontWeight="bold">Welcome to App Mining!</Type> We emailed your App Mining starter kit to {email}.
      </Type>
    </Box>
    <Flex pb={6} alignItems="center">
      <Box pr={4}>
        <BuildGraphic />
      </Box>
      <Box>
        <Type pb={4} fontSize={2} fontWeight="bold">
          New to Blockstack? Need to integrate Blockstack authentication?
        </Type>
        <Type>Learn how with our Zero-to-Dapp tutorial.</Type>
      </Box>
    </Flex>
    <Flex alignItems="center">
      <Box pr={4}>
        <RegisterGraphic />
      </Box>
      <Box>
        <Type pb={4} fontSize={2} fontWeight="bold">
          Have a user-ready Blocstack app?
        </Type>
        <Type>Register on App.co and complete the App Mining Ready steps.</Type>
      </Box>
    </Flex>
  </Box>
)

const handleSubmit = (setState) => setState({ view: 'success' })
const StarterKitModal = ({ ...rest }) => (
  <Modal component={ModalComponent} header={header} {...rest}>
    <State initial={{ view: 'initial' }}>
      {({ state, setState }) => (
        <>{state.view === 'initial' ? <InitialView handleSubmit={() => handleSubmit(setState)} /> : <SuccessView />}</>
      )}
    </State>
  </Modal>
)

export { StarterKitModal }

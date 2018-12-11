import React from 'react'
import { Modal, Flex, Type, Box, Button } from 'blockstack-ui'
import { State } from 'react-powerplug'
import { BuildGraphic, RegisterGraphic, ArrowIcon } from '@components/mining/svg'
import { Newsletter } from '@components/mining/newsletter'
import { NewsletterContext } from '@components/mining/newsletter/container'

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

const InitialView = ({ setState, view, handleSubmit }) => {
  return (
    <>
      <Type color="blue" lineHeight={1.5} maxWidth="80%" fontSize={5} fontFamily="brand">
        Get your App Mining Starter Kit
      </Type>
      <Box pt={4}>
        <Box>
          <Newsletter
            onSubmit={async (doSubmit) => {
              const email = await doSubmit()
              if (email && view === 'initial') {
                setState({ view: 'success', value: email })
              }
            }}
            hideButton
            variant="ui"
            placeholder="Enter your email address"
          >
            <NewsletterContext.Consumer>
              {({ doSubmit, loading, isValid }) => (
                <Box pt={5}>
                  <Button
                    disabled={!isValid}
                    onClick={async () => {
                      const email = await doSubmit()
                      if (email && view === 'initial') {
                        setState({ view: 'success', value: email })
                      }
                    }}
                    width={1}
                    height="auto"
                    py={2}
                    icon={!loading ? ArrowIcon : undefined}
                  >
                    {loading ? 'Loading...' : 'Submit'}
                  </Button>
                </Box>
              )}
            </NewsletterContext.Consumer>
          </Newsletter>
        </Box>
      </Box>
    </>
  )
}

const SuccessView = ({ value }) => (
  <Box color="blue.dark" lineHeight={1.35}>
    <Box pb={6}>
      <Type fontSize={3}>
        <Type fontWeight="bold">Welcome to App Mining!</Type> We emailed your App Mining Starter Kit to <em>{value}</em>
        .
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
        <Type is="a" href="https://docs.blockstack.org/develop/zero_to_dapp_1.html" target="_blank">
          Learn how with our Zero-to-Dapp tutorial.
        </Type>
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
        {/**
         * TODO: add link
         */}
        <Type>
          <Type is="a" href="https://app.co/submit" target="_blank">
            Register on App.co
          </Type>{' '}
          and complete the App Mining Ready steps.
        </Type>
      </Box>
    </Flex>
  </Box>
)

const handleSubmit = (setState) => setState({ view: 'success' })
const StarterKitModal = ({ ...rest }) => (
  <Modal component={ModalComponent} header={header} {...rest}>
    <State initial={{ view: 'initial' }}>
      {({ state, setState }) => (
        <>
          {state.view === 'initial' ? (
            <InitialView view={state.view} setState={setState} handleSubmit={() => handleSubmit(setState)} />
          ) : (
            <SuccessView value={state.value} />
          )}
        </>
      )}
    </State>
  </Modal>
)

export { StarterKitModal }

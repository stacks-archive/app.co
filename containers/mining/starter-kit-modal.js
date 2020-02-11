import React from 'react';
import { Modal, Flex, Type, Box, Button } from 'blockstack-ui';
import { State, Hover } from 'react-powerplug';
import {
  BuildGraphic,
  RegisterGraphic,
  ArrowIcon,
} from '@components/mining/svg';
import { Newsletter } from '@components/mining/newsletter';
import { NewsletterContext } from '@components/mining/newsletter/container';
import { trackEvent } from '@utils';

const ModalComponent = props => (
  <Flex
    position="relative"
    maxWidth={600}
    width="100%"
    flexDirection="column"
    bg="white"
    {...props}
  />
);
const header = props => (
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
);

const InitialView = ({ setState, view, content }) => (
  <Box p={6}>
    <Type
      color="blue"
      lineHeight={1.5}
      maxWidth="80%"
      fontSize={5}
      fontFamily="brand"
    >
      {content.title}
    </Type>
    <Box pt={4}>
      <Box>
        <Newsletter
          onSubmit={async doSubmit => {
            const email = await doSubmit();
            if (email && view === 'initial') {
              setState({ view: 'success', value: email });
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
                    const email = await doSubmit();
                    if (email && view === 'initial') {
                      setState({ view: 'success', value: email });
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
  </Box>
);

const Item = ({ graphic: Graphic, title, link, cta, ...rest }) => (
  <Hover>
    {({ hovered, bind }) => (
      <Flex
        py={[4]}
        px={[4, 6]}
        display={['block', 'flex', 'flex', 'flex']}
        bg="white"
        boxShadow="card"
        borderRadius="6px"
        is="a"
        href={link}
        target="_blank"
        alignItems="center"
        flexDirection={['column', 'row', 'row', 'row']}
        transition="0.08s all ease-in-out"
        transform={hovered ? 'translateY(-5px)' : 'none'}
        {...rest}
        {...bind}
      >
        <Box
          width={['80px', '120px', '140px']}
          pr={[4, 5]}
          py={4}
          flexShrink={0}
        >
          <Graphic />
        </Box>
        <Box lineHeight={1.65}>
          <Type
            pb={2}
            fontSize={3}
            fontWeight="500"
            color={hovered ? 'blue' : 'blue.dark'}
          >
            {title}
          </Type>
          <Type>{cta}</Type>
        </Box>
      </Flex>
    )}
  </Hover>
);

const SuccessView = ({ value, content }) => (
  <Flex
    p={[4, 6]}
    bg="blue.light"
    justifyContent="center"
    flexDirection="column"
    flexGrow={1}
    color="blue.dark"
    lineHeight={1.35}
    display={['block', 'flex', 'flex', 'flex']}
  >
    <Box pb={6}>
      <Box pb={4}>
        <Type
          color="blue"
          lineHeight={1.5}
          maxWidth="80%"
          fontSize={5}
          fontFamily="brand"
        >
          {content.title}
        </Type>
      </Box>
      <Type fontSize={3}>
        {content.body} <em>{value}</em>.
      </Type>
    </Box>
    <Item
      graphic={BuildGraphic}
      link="https://docs.blockstack.org/develop/zero_to_dapp_1.html"
      title="New to Blockstack?"
      cta="Need to integrate Blockstack authentication? Learn how with our Zero-to-Dapp tutorial."
      onClick={() => trackEvent('Starter Kit Click Zero-to-Dapp')}
      mb={4}
    />
    <Item
      graphic={RegisterGraphic}
      link="/submit"
      onClick={() => trackEvent('Starter Kit Click to Submit Page')}
      title="Have a user-ready Blockstack app?"
      cta="Register on App.co and complete the App Mining Ready steps."
    />
  </Flex>
);

const handleSubmit = setState => setState({ view: 'success' });
const StarterKitModal = ({ content, ...rest }) => {
  if (rest.visible) {
    trackEvent('Open App Mining Starter Kit Modal');
  }
  return (
    <Modal
      alignItems={['center', 'unset']}
      height={['100vh', 'unset']}
      maxHeight="100vh"
      component={ModalComponent}
      header={header}
      p="0 !important"
      {...rest}
    >
      <State initial={{ view: 'initial' }}>
        {({ state, setState }) => (
          <>
            {state.view === 'initial' ? (
              <InitialView
                content={content.initial}
                view={state.view}
                setState={setState}
                handleSubmit={() => handleSubmit(setState)}
              />
            ) : (
              <SuccessView content={content.success} value={state.value} />
            )}
          </>
        )}
      </State>
    </Modal>
  );
};

export { StarterKitModal };

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  selectNewsletterHasSubscribed,
  selectNewsletterSubmitting,
} from '@stores/newsletter/selectors';
import NewsletterActions from '@stores/newsletter/actions';
import { PlanetsWithGasGiant } from '@components/svg';
import { Type } from '@components/typography';
import { Input } from '@components/input';
import { theme } from '@common/styles';
import { Box } from 'blockstack-ui';
import CloseIcon from 'mdi-react/CloseIcon';
import { withCookies } from 'react-cookie';
import {
  getNewsletterCookie,
  setNewsletterCookie,
  CLOSED,
  SUBSCRIBED,
} from '@common/lib/cookies';

import { StyledNewsletter } from './styled';
import { trackEvent } from '@utils';

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

class NewsletterClass extends React.Component {
  state = {
    email: null,
    cookie: getNewsletterCookie(this.props.cookies),
    validEmail: true,
  };

  constructor(props) {
    super(props);
    const cookie = getNewsletterCookie(this.props.cookies);
    if (!cookie) {
      setNewsletterCookie(this.props.cookies);
    }
  }

  handleClose = (state = CLOSED) => {
    const cookie = getNewsletterCookie(this.props.cookies);
    if (cookie && cookie.state !== state) {
      console.log('setting cookie');
      setNewsletterCookie(this.props.cookies, state);
      const updatedCookie = getNewsletterCookie(this.props.cookies);
      console.log('cookie set', updatedCookie);
    }
  };

  handleSubmit = (email = this.state.email) => {
    if (email.match(EMAIL_REGEX)) {
      this.props.doSubmitEmail(
        email,
        setTimeout(() => this.handleClose(SUBSCRIBED), 5400)
      );
    } else {
      this.setState({ validEmail: false });
    }
  };

  render() {
    const cookie = getNewsletterCookie(this.props.cookies);
    const { serverCookies } = this.props;
    const serverCookie =
      serverCookies &&
      serverCookies.BLOCKSTACK_NEWSLETTER &&
      JSON.parse(serverCookies.BLOCKSTACK_NEWSLETTER);

    const show = () => {
      if (cookie && cookie.state === CLOSED) return false;
      if (serverCookie && serverCookie.state === CLOSED) return false;
      if (cookie && cookie.state === SUBSCRIBED) return false;
      if (serverCookie && serverCookie.state === SUBSCRIBED) return false;

      return true;
    };

    const doShow = show();
    if (doShow) {
      trackEvent('Open Get Updates Modal');
    }

    const doingSomething =
      this.props.submitted || this.props.subscribed || this.props.submitting;
    const text = this.props.submitting
      ? 'Loading...'
      : 'Thanks for subscribing!';
    return doShow ? (
      <StyledNewsletter pl={3} py={3} mb={[3, 4]} {...this.props}>
        <StyledNewsletter.Wrapper>
          <Box
            dark
            style={{
              position: 'absolute',
              zIndex: 20,
              right: '6px',
              top: '6px',
              cursor: 'pointer',
            }}
            onClick={() => this.handleClose()}
          >
            <CloseIcon color="rgba(255,255,255,0.5)" size={18} />
          </Box>
          <StyledNewsletter.Svg
            top={[10]}
            left={['100%', 10]}
            right={[[10, 'auto']]}
          >
            <PlanetsWithGasGiant />
          </StyledNewsletter.Svg>
          <StyledNewsletter.Section width="60%">
            <Type.h3
              color={theme.colors.blue.accent}
              pl={[0, 0, 68]}
              py={2}
              pr={2}
            >
              {doingSomething ? 'Thanks for subscribing!' : 'Get updates'}{' '}
              <Type.span color={theme.colors.grey.light}>
                {doingSomething
                  ? "We'll send you the hottest new dapps soon."
                  : 'Discover your next favorite decentralized app!'}
              </Type.span>
            </Type.h3>
          </StyledNewsletter.Section>
          {!doingSomething && (
            <StyledNewsletter.Section
              pr={2}
              style={{ pointerEvents: doingSomething ? 'none' : null }}
            >
              <Input
                px={3}
                py={2}
                my={2}
                placeholder="Enter your email"
                value={doingSomething ? text : this.state.email}
                action={!doingSomething ? () => this.handleSubmit() : null}
                onChange={evt =>
                  this.setState({ email: evt.target.value, validEmail: true })
                }
              />
              {!this.state.validEmail && (
                <>
                  <Type.span color={theme.colors.red} fontSize={12}>
                    Please enter a valid email
                  </Type.span>
                </>
              )}
            </StyledNewsletter.Section>
          )}
        </StyledNewsletter.Wrapper>
      </StyledNewsletter>
    ) : null;
  }
}

const mapStateToProps = state => ({
  subscribed: selectNewsletterHasSubscribed(state),
  submitting: selectNewsletterSubmitting(state),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, NewsletterActions), dispatch);
}

const Newsletter = withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewsletterClass)
);

export { Newsletter };

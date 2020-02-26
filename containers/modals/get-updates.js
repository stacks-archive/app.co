import React from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import NewsletterActions from '@stores/newsletter/actions';
import {
  selectNewsletterHasSubscribed,
  selectNewsletterSubmitting,
  selectNewsletterModalIsOpen,
} from '@stores/newsletter/selectors';

import StyledModal from '@components/modal';
import { Type } from '@components/typography';
import { Input } from '@components/input';
import { StyledNewsletter } from '@components/newsletter/styled';
import { theme } from '@common/styles';

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

class GetUpdates extends React.Component {
  state = {
    email: null,
    validEmail: true,
  };

  static propTypes = {
    submitted: PropTypes.bool,
    submitting: PropTypes.bool.isRequired,
    subscribed: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    closeNewsletterModal: PropTypes.func.isRequired,
    doSubmitEmail: PropTypes.func.isRequired,
  };

  handleClose = () => {
    this.props.closeNewsletterModal();
  };

  handleSubmit = (email = this.state.email) => {
    if (email.match(EMAIL_REGEX)) {
      this.props.doSubmitEmail(email);
    } else {
      this.setState({ validEmail: false });
    }
  };

  render() {
    if (!this.props.open) {
      return null;
    }
    const doingSomething =
      this.props.submitted || this.props.subscribed || this.props.submitting;
    const text = this.props.submitting
      ? 'Loading...'
      : 'Thanks for subscribing!';
    return (
      <StyledModal.Modal>
        <StyledModal.Content dark width={[1, 0.65, 0.65, 0.5]} p={4}>
          <StyledModal.CloseButton
            dark
            style={{
              position: 'absolute',
              zIndex: 20,
              right: '30px',
              top: '25px',
            }}
            onClick={() => this.handleClose()}
          >
            <CloseIcon color="#fff" />
          </StyledModal.CloseButton>
          <Type.h3
            color={theme.colors.blue.accent}
            lineHeight={1.5}
            mb={doingSomething ? 4 : 0}
          >
            {doingSomething ? 'Thanks for subscribing!' : 'Get updates'}{' '}
            <Type.span color={theme.colors.grey.light}>
              {doingSomething
                ? "We'll send you the hottest new dapps soon."
                : 'Discover your next favorite decentralized app!'}
            </Type.span>
          </Type.h3>

          {!doingSomething && (
            <StyledNewsletter.Section
              style={{
                pointerEvents: doingSomething ? 'none' : null,
              }}
              pt={4}
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
        </StyledModal.Content>
        <StyledModal.Backdrop onClick={() => this.handleClose(true)} />
      </StyledModal.Modal>
    );
  }
}

const mapStateToProps = state => ({
  subscribed: selectNewsletterHasSubscribed(state),
  submitting: selectNewsletterSubmitting(state),
  open: selectNewsletterModalIsOpen(state),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, NewsletterActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GetUpdates);

import React from 'react'
import { PlanetsWithGasGiant } from '@components/svg'
import { Type } from '@components/typography'
import { Input } from '@components/input'
import { theme } from '@common/styles'
import { connect } from 'react-redux'
import { doSubmitEmail } from '@stores/newsletter/actions'
import { selectNewsletterHasSubscribed, selectNewsletterSubmitting } from '@stores/newsletter/selectors'
import { StyledNewsletter } from './styled'
import {StyledPage} from '@components/page/styled'

const mapStateToProps = (state) => ({
  subscribed: selectNewsletterHasSubscribed(state),
  submitting: selectNewsletterSubmitting(state)
})
const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

class NewsletterClass extends React.Component {
  state = {
    email: null
  }
  handleSubmit = (email = this.state.email) => {
    if (email.match(EMAIL_REGEX)) {
      const { dispatch } = this.props
      dispatch(doSubmitEmail(email))
    }
  }
  render() {
    const doingSomething = this.props.submitted | this.props.subscribed
    const text = this.props.submitting ? 'Loading...' : 'Thanks for subscribing!'
    return (
      <StyledNewsletter p={3} mb={4} {...this.props}>
        <StyledNewsletter.Wrapper>
        <StyledNewsletter.Svg top={10} left={10}>
          <PlanetsWithGasGiant />
        </StyledNewsletter.Svg>
        <StyledNewsletter.Section width="60%">
          <Type.h3 color={theme.colors.blue.accent} pl={68} py={2} pr={2}>
            Get updates{' '}
            <Type.span color={theme.colors.grey.light}>Discover your next favorite decentralized app!</Type.span>
          </Type.h3>
        </StyledNewsletter.Section>
        <StyledNewsletter.Section
          style={{
            pointerEvents: doingSomething ? 'none' : null
          }}
        >
          <Input
            px={3}
            py={2}
            my={2}
            placeholder="Enter your email"
            value={doingSomething ? text : this.state.email}
            action={!doingSomething ? () => this.handleSubmit() : null}
            onChange={(evt) => this.setState({ email: evt.target.value })}
          />
        </StyledNewsletter.Section>
        </StyledNewsletter.Wrapper>
      </StyledNewsletter>
    )
  }
}

const Newsletter = connect(mapStateToProps)(NewsletterClass)

export { Newsletter }

import React from 'react'
import { PlanetsWithGasGiant } from '@components/svg'
import { Type } from '@components/typography'
import { Input } from '@components/input'
import { theme } from '@common/styles'
import { connect } from 'react-redux'
import { doSubmitEmail } from '@stores/newsletter/actions'
import { StyledNewsletter } from './styled'

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

class NewsletterClass extends React.Component {
  state = {
    email: null
  }
  handleSubmit = (email = this.state.email) => {
    if (email.match(EMAIL_REGEX)) {
      const { dispatch } = this.props
      console.log('submitting email')
      dispatch(doSubmitEmail(email))
    }
  }
  render() {
    return (
      <StyledNewsletter p={3} {...this.props}>
        <StyledNewsletter.Svg top={5} left={10}>
          <PlanetsWithGasGiant />
        </StyledNewsletter.Svg>
        <StyledNewsletter.Section>
          <Type.h3 color={theme.colors.blue.accent} pl={68}>
            Get updates{' '}
            <Type.span color={theme.colors.grey.light}>Discover your next favorite decentralized app!</Type.span>
          </Type.h3>
        </StyledNewsletter.Section>
        <StyledNewsletter.Section>
          <Input
            px={3}
            py={2}
            placeholder="Enter your email"
            action={() => this.handleSubmit()}
            onChange={(evt) => this.setState({ email: evt.target.value })}
          />
        </StyledNewsletter.Section>
      </StyledNewsletter>
    )
  }
}

const Newsletter = connect()(NewsletterClass)

export { Newsletter }

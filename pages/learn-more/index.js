import React from 'react'
import { Page } from '@components/page'
import { Newsletter } from '@components/newsletter'
import Content from './content.md'

class LearnMore extends React.PureComponent {
  render() {
    return (
      <Page>
        <Page.Section px>
          <Newsletter wrap />
        </Page.Section>
        <Page.Section wrap px richText>
          <Content />
        </Page.Section>
      </Page>
    )
  }
}

export default LearnMore

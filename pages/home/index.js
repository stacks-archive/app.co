import React from 'react'
import { Page } from '@components/page'
import { Newsletter } from '@components/newsletter'

class HomePage extends React.PureComponent {
  render() {
    return (
      <Page>
        <Newsletter wrap />
        Home!
      </Page>
    )
  }
}

export { HomePage }

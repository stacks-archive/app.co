import React from 'react'
import { Page } from '@components/page'
import { Newsletter } from '@components/newsletter'
import { AppsList } from '@components/list/apps'
import { CategoriesList } from '@components/list/categories'
import { HeroSlider } from '@components/hero-slider'
import { PlatformsList } from '@components/list/platforms'

class HomePage extends React.PureComponent {
  state = {
    filterBy: 'category'
  }

  render() {
    return (
      <Page>
        <Page.Section px>
          <Newsletter wrap  />
        </Page.Section>
        <Page.Section p={0} px>
          <Page.Section wrap flexDirection={['column', 'column', 'row']} p={0}>
            <PlatformsList mr={[0, 3]} />
            <CategoriesList />
          </Page.Section>
        </Page.Section>
        <Page.Section flexDirection="column" px>
          <AppsList filterBy={this.state.filterBy} />
        </Page.Section>
      </Page>
    )
  }
}

export { HomePage }

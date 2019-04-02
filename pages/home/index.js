import React from 'react'
import { Page } from '@components/page'
import { Newsletter } from '@components/newsletter'
import { FeaturedList, AppsList } from '@components/list/apps'
import { CategoriesList } from '@components/list/categories'
import { doSelectApp } from '@stores/apps'
import { PlatformsList } from '@components/list/platforms'
import Modal from '@containers/modals/app'
import Head from '@containers/head'
import { selectRankedBlockstackApps } from '@stores/apps/selectors'

class HomePage extends React.PureComponent {
  static async getInitialProps({ req, reduxStore }) {
    const rankings = selectRankedBlockstackApps(reduxStore.getState())
    const props = { rankings }

    if (req) {
      const {
        params: { appSlug }
      } = req

      reduxStore.dispatch(doSelectApp(appSlug))

      return {
        ...props,
        appSlug
      }
    }

    return props
  }

  render() {
    return (
      <Page>
        <Head />
        <Page.Section px>
          <Newsletter serverCookies={this.props.serverCookies} wrap />
        </Page.Section>
        <Page.Section flexDirection="column" px>
          <FeaturedList
            appNames={this.props.rankings.map((app) => app.name)}
            title="Popular Blockstack Apps"
            href="/blockstack"
            hrefAttrs={{ as: '/blockstack', href: { pathname: '/platforms', query: { platform: 'blockstack' } } }}
            filterBy="platforms"
            singular="platform"
            query="blockstack"
            limit={23}
          />
          <AppsList
            single
            limit={4}
            filterBy="all"
            title="Popular Decentralized Apps"
            header={{
              action: {
                label: 'View All'
              },
              href: {
                pathname: '/all'
              },
              as: '/all'
            }}
          />
        </Page.Section>

        <Page.Section p={0} pl={[0, 4]} pr={[0, 4]}>
          <Page.Section wrap flexDirection={['column', 'column', 'row']} p={0}>
            <PlatformsList />
            <CategoriesList gutter />
          </Page.Section>
        </Page.Section>
        <Page.Section flexDirection="column" px>
          <FeaturedList
            appNames={['MyCrypto', 'MyEtherWallet', 'Balance.io', 'Coinbase Wallet', 'MetaMask', 'Trust Wallet']}
            title="Ethereum Wallets"
          />
          <FeaturedList
            title="Decentralized Exchanges"
            appNames={['Airswap', 'EtherDelta', 'Radar Relay', 'IDEX', 'OasisDEX', 'Paradex', 'Dexy']}
          />
          <FeaturedList
            appNames={['SteemIt', 'Stealthy', 'Peepeth', 'Mastodon', 'Diaspora', 'DTube']}
            title="Hot Social Dapps"
            href="/categories/social-networking"
            filterBy="categories"
            singular="category"
            query="social-networking"
          />
          <FeaturedList
            appNames={['Graphite', 'Misthos', 'Aragon', 'Gitcoin', 'adChain Registry', 'ETHLance']}
            title="Business Tools"
            href="/categories/business-tools"
            filterBy="categories"
            singular="category"
            query="business-tools"
          />
        </Page.Section>
        <Modal />
      </Page>
    )
  }
}

export { HomePage }

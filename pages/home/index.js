import React from 'react'
import { Page } from '@components/page'
import { Newsletter } from '@components/newsletter'
import { FeaturedList } from '@components/list/apps'
import { CategoriesList } from '@components/list/categories'
import { doSelectApp } from '@stores/apps'
import { PlatformsList } from '@components/list/platforms'
import Modal from '@containers/modals/app'
import Head from '@containers/head'

class HomePage extends React.PureComponent {
  static getInitialProps({ req, reduxStore }) {
    if (req) {
      const {
        params: { appSlug }
      } = req

      reduxStore.dispatch(doSelectApp(appSlug))

      return {
        appSlug
      }
    }

    return {}
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
            appNames={[
              "SteemIt",
              "Stealthy",
              "Peepeth",
              "Mastodon",
              "Diaspora",
              "DTube"
            ]}
            title="Hot Social Dapps"
            href="/categories/social-networking"
          />
          <FeaturedList
            appNames={[
              "Graphite",
              "Misthos",
              "Aragon",
              "Gitcoin",
              "adChain Registry",
              "ETHLance"
            ]}
            title="Business Tools"
            href="/categories/business-tools"
          />
        </Page.Section>
        <Page.Section p={0} px>
          <Page.Section wrap flexDirection={['column', 'column', 'row']} p={0}>
            <PlatformsList mr={[0, 3]} />
            <CategoriesList />
          </Page.Section>
        </Page.Section>
        <Page.Section flexDirection="column" px>
          <FeaturedList
            title="Decentralized Exchanges"
            appNames={[
              "Radar Relay",
              "IDEX",
              "OasisDEX",
              "ForkDelta"
            ]}
          />
          <FeaturedList
            appNames={[
              'MyCrypto',
              'MyEtherWallet',
              'Balance.io',
              'Toshi',
              'MetaMask',
              'Exodus',
              'Trust Wallet'
            ]}
            title='Ethereum Wallets'
          />
          <FeaturedList
            appNames={[
              "Graphite",
              "Stealthy",
              "Misthos",
              "TravelStack",
              "Dappy Wallet",
              "Coins"
            ]}
            title="Popular Blockstack Apps"
            href="/platforms/blockstack"
          />
        </Page.Section>
        <Modal />
      </Page>
    )
  }
}

export { HomePage }

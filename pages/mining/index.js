import * as React from 'react';
import Head from '@containers/head';
import { MiningPage } from '@components/mining/page';
import {
  selectAppMiningMonths,
  selectAppMiningApps
} from '@stores/apps/selectors';
import { connect } from 'react-redux';
import { Hero } from '@containers/mining/sections/hero';
import { HowMuchSection } from '@containers/mining/sections/how-much-earn';
import { ModalRoot } from 'blockstack-ui';
import { Header } from '@components/mining/header';
import { Footer } from '@components/mining/footer';
import { trackEvent } from '@utils';

const handleBodyScroll = on =>
  on
    ? document.body.classList.remove('no-scroll')
    : document.body.classList.add('no-scroll');

class AppMiningPage extends React.Component {
  static async getInitialProps({ reduxStore }) {
    const state = reduxStore.getState();
    try {
      const faqsResponse = await fetch(
        `${process.env.API_SERVER}/api/mining-faq`
      );
      const faqsData = await faqsResponse.json();
      const apps = selectAppMiningApps(state);
      const months = selectAppMiningMonths(state);

      if (months && months.length) {
        const rankings = months[months.length - 1].compositeRankings.map(
          app => {
            const appWithLifetimeEarnings = apps.find(
              otherApp => otherApp.name === app.name
            );
            return {
              ...appWithLifetimeEarnings,
              ...app
            };
          }
        );

        const rankingMonths = months.map(month => {
          const theApps = month.compositeRankings.map(app => {
            const appWithLifetimeEarnings = apps.find(
              otherApp => otherApp.name === app.name
            );
            return {
              ...appWithLifetimeEarnings,
              ...app
            };
          });

          return {
            ...month,
            apps: theApps
          };
        });
        return {
          rankings,
          month: months[months.length - 1],
          months,
          rankingMonths,
          faq: faqsData.faqs,
          apps
        };
      } else {
        console.log('no months!');
        return {};
      }
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  componentDidMount() {
    handleBodyScroll(true);
    trackEvent('View Mining Landing Page');
  }

  render() {
    return (
      <ModalRoot>
        <MiningPage>
          <Head
            title="App Mining"
            description=""
            ogImage="/static/images/og.png"
          />
          <Header />
          <Hero
            apps={this.props.rankings}
            position="relative"
            zIndex={1000}
          />
          <HowMuchSection
            apps={this.props.rankings}
            months={this.props.rankingMonths}
          />
          <Footer />
        </MiningPage>
      </ModalRoot>
    );
  }
}

export default connect(state => state)(AppMiningPage);

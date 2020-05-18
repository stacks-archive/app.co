import React from 'react';
import PropTypes from 'prop-types';
import { Page } from '@components/page';
import { AppsList } from '@components/list/apps';
import Modal from '@containers/modals/app';
import Head from '@containers/head';
import { PlatformsList } from '@components/list/platforms';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppStore, {
  doSelectPlatformFilter,
  doClearPlatformFilter,
} from '@stores/apps';
import { selectPlatformName, selectAllPlatforms } from '@stores/apps/selectors';

const mapStateToProps = state => ({
  platformName: selectPlatformName(state),
  platforms: selectAllPlatforms(state),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions), dispatch);
}

/**
 * We are using connect on this component and not the class
 * because the class cannot run getInitialProps if it's connected
 */
const PageContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ platformName, platform, platforms, ...rest }) => (
  <>
    <Head title={platformName ? `${platformName} Apps` : 'All Platforms'} />
    {platform ? (
      <Page.Section flexDirection="column" px>
        <AppsList
          single={!!platform}
          sectionKeys={platforms}
          limit={platform ? undefined : 7}
          filterBy="platform"
          {...rest}
        />
      </Page.Section>
    ) : (
      <Page.Section p={0} pl={[0, 4]} pr={[0, 4]}>
        <Page.Section wrap flexDirection={['column', 'column', 'row']} p={0}>
          <PlatformsList limit={0} width={[1, 1 / 4]} noAll />
        </Page.Section>
      </Page.Section>
    )}
    <Modal />
  </>
));

class PlatformsPage extends React.PureComponent {
  propTypes = {
    platformName: PropTypes.string,
    platforms: PropTypes.array.isRequired,
  };
  static async getInitialProps({ req, query, reduxStore }) {
    const platform = req ? req.params.platform : query.platform;
    if (platform === 'blockstack') {
      window.location.href = 'https://www2.blockstack.org/apps';
    }
    if (platform) {
      reduxStore.dispatch(doSelectPlatformFilter(platform));
      return { platform };
    } else {
      reduxStore.dispatch(doClearPlatformFilter());
    }
    return {};
  }

  render() {
    return (
      <Page>
        <PageContent {...this.props} />
      </Page>
    );
  }
}

export default PlatformsPage;

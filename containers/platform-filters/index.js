import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Link from 'next/link';

import AppStore from '@stores/apps';
import { doSelectPlatformFilter } from '@stores/apps';
import { selectPlatformFilter } from '@stores/apps/selectors';
import UserStore from '@stores/user';

import * as StyledPlatformFilters from '@components/platform-filters';

const PlatformFilters = ({ platformFilter }) => {
  const platformURL = platform =>
    `/platform/${encodeURIComponent(platform.toLowerCase())}`;
  const platform = (platform, opts) => (
    <Link href={platformURL(platform)} key={platform}>
      <StyledPlatformFilters.Filter
        key={platform}
        href={platformURL(platform)}
        selected={platformFilter === platform.toLowerCase()}
      >
        <StyledPlatformFilters.FilterImage
          title={platform}
          src={`/static/images/platforms/${opts.image}@3x.png`}
        />
        <StyledPlatformFilters.PlatformTitle>
          {platform}
        </StyledPlatformFilters.PlatformTitle>
      </StyledPlatformFilters.Filter>
    </Link>
  );
  return (
    <>
      ' '
      <StyledPlatformFilters.FilterSubtitle>
        Show Dapps by Platform
      </StyledPlatformFilters.FilterSubtitle>
      ' '
      <StyledPlatformFilters.Filters>
        {platform('Blockstack', { image: 'blockstack/blockstack' })}
        {platform('Ethereum', { image: 'ethereum/ethereum-1' })}
        {platform('Steem', { image: 'steem/steem' })}
        {platform('EOS', { image: 'EOS/EOS' })}
        {platform('IPFS', { image: 'ipfs/IPFS' })}
        {platform('ZeroNet', { image: 'ZeroNet/ZeroNet' })}
        {/* {platform('DAT', { image: 'dat/dat-hexagon' })} */}
      </StyledPlatformFilters.Filters>
      ' '
    </>
  );
};

const mapStateToProps = state => ({
  platformFilter: selectPlatformFilter(state),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign({}, AppStore.actions, UserStore.actions),
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlatformFilters);

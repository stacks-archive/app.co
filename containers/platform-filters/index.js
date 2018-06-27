import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Link from 'next/link';

import AppStore from '@stores/apps';
import { doSelectPlatformFilter } from '@stores/apps';
import { selectPlatformFilter } from '@stores/apps/selectors';
import UserStore from '@stores/user';

import { StyledAppList } from '@components/app-list';

const PlatformFilters = ({ platformFilter }) => {
  const platform = (platform, opts) => (
    <Link href={`/platform/${platform.toLowerCase()}`} key={platform}>
      <StyledAppList.Filter
        key={platform}
        selected={platformFilter === platform.toLowerCase()}
      >
        <StyledAppList.FilterImage title={platform} src={`/static/images/platforms/${opts.image}@3x.png`} />
        {platform}
      </StyledAppList.Filter>
    </Link>
  );
  return (
    <>
      <StyledAppList.FilterSubtitle>Show Dapps by</StyledAppList.FilterSubtitle>
      <StyledAppList.Filters>
        <StyledAppList.ClearFilter
        selected={!platformFilter}
        >
          All Platforms
            </StyledAppList.ClearFilter>
        {platform('Blockstack', { image: 'blockstack/blockstack' })}
        {platform('Ethereum', { image: 'ethereum/ethereum-1' })}
        {platform('Steem', { image: 'steem/steem' })}
        {platform('EOS', { image: 'EOS/EOS' })}
        {platform('IPFS', { image: 'ipfs/IPFS' })}
        {platform('ZeroNet', { image: 'ZeroNet/ZeroNet' })}
        {platform('DAT', { image: 'dat/dat-hexagon' })}
      </StyledAppList.Filters>
    </>
  );
}

const mapStateToProps = (state) => ({
  platformFilter: selectPlatformFilter(state),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformFilters);
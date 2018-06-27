import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectPlatformFilter } from '@stores/apps/selectors';

import { StyledHero } from '@components/hero';
import { StyledHeader } from '@components/header';

import { capitalize } from '@utils';

const HeroContainer = ({ platformFilter }) => (
  <StyledHero>
    <StyledHero.Inner>
      <StyledHero.Content>
        <StyledHeader.Logo smShow>App.co</StyledHeader.Logo>
				{platformFilter ? (
					<h1>{capitalize(platformFilter)} Apps</h1>
				) : (
					<>
						<h1>Universal Dapp Store</h1>
						<h3>Discover Decentralized Apps</h3>
					</>
				)}
      </StyledHero.Content>
    </StyledHero.Inner>
  </StyledHero>
);

const mapStateToProps = (state) => ({
  platformFilter: selectPlatformFilter(state),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}), dispatch);
}

const Hero = connect(mapStateToProps, mapDispatchToProps)(HeroContainer);

export { Hero };

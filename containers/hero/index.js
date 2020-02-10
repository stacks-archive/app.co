import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectPlatformName, selectCategoryName } from '@stores/apps/selectors';

import { StyledHero } from '@components/hero';
import { StyledHeader } from '@components/header';

import { capitalize } from '@utils';

const HeroContainer = ({ platformName, categoryName }) => (
  <StyledHero>
    <StyledHero.Inner>
      <StyledHero.Content>
        <StyledHeader.Logo smShow>
          <StyledHeader.LogoLink href="/">App.co</StyledHeader.LogoLink>
        </StyledHeader.Logo>
        {platformName || categoryName ? (
          <h1>{platformName || categoryName} Apps</h1>
        ) : (
          <>
            ' '<h1>Universal Dapp Store</h1>' '
            <h3>Discover Decentralized Apps</h3>' '
          </>
        )}
      </StyledHero.Content>
    </StyledHero.Inner>
  </StyledHero>
);

const mapStateToProps = state => ({
  platformName: selectPlatformName(state),
  categoryName: selectCategoryName(state),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}), dispatch);
}

const Hero = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeroContainer);

export { Hero };

import React from 'react';
import { StyledHero } from '@components/hero';
import { StyledHeader } from '@components/header';

const Hero = () => (
  <StyledHero>
  	<StyledHero.Inner>
	    <StyledHero.Content>
	    	<StyledHeader.Logo smShow={true}>App.co</StyledHeader.Logo>
	      <h1>
	        Universal Dapp Store
	      </h1>
	      <h3>
	      	Discover Decentralized Apps
	      </h3>
	    </StyledHero.Content>
    </StyledHero.Inner>
  </StyledHero>
);

export { Hero };

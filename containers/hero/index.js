import React from 'react';
import { StyledHero } from '@components/hero';
import { StyledHeader } from '@components/header';

const Hero = () => (
  <StyledHero>
  	<StyledHero.Inner>
	    <StyledHero.Content>
	    	<StyledHeader.Logo smShow={true}>App.co</StyledHeader.Logo>
	      <h1>
	        Universal
	        <br />
	        Dapp Store
	      </h1>
	    </StyledHero.Content>
    </StyledHero.Inner>
  </StyledHero>
);

export { Hero };

import React from 'react';
import { StyledHero } from '@components/hero';
import PropTypes from 'prop-types';

const Hero = () => (
  <StyledHero>
    <StyledHero.Content>
      <h1>
        Universal
        <br />
        Dapp Repository
      </h1>
    </StyledHero.Content>
  </StyledHero>
);

Hero.propTypes = {
  title: PropTypes.string.required,
};

export { Hero };

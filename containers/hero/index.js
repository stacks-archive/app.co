import React from 'react';
import { StyledHero } from '@components/hero';
import PropTypes from 'prop-types';

const Hero = ({ title }) => (
  <StyledHero>
    <StyledHero.Content>
      <h1>{title}</h1>
    </StyledHero.Content>
  </StyledHero>
);

Hero.propTypes = {
  title: PropTypes.string.required,
};

export { Hero };

import React from 'react';
import { StyledHeroSlider } from '@components/hero-slider/styled';
import Carousel from 'nuka-carousel';
const HeroSlider = ({ slides, ...rest }) => (
  <StyledHeroSlider {...rest}>
    <Carousel slidesToShow={3} initialSlideHeight={400}>
      <StyledHeroSlider.Item>slide 1</StyledHeroSlider.Item>
      <StyledHeroSlider.Item>slide 1</StyledHeroSlider.Item>
      <StyledHeroSlider.Item>slide 1</StyledHeroSlider.Item>
      <StyledHeroSlider.Item>slide 1</StyledHeroSlider.Item>
      <StyledHeroSlider.Item>slide 1</StyledHeroSlider.Item>
      <StyledHeroSlider.Item>slide 1</StyledHeroSlider.Item>
      <StyledHeroSlider.Item>slide 1</StyledHeroSlider.Item>
    </Carousel>
  </StyledHeroSlider>
);

export { HeroSlider };

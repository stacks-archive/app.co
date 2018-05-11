import React from 'react';
import { StyledHeader } from '@components/header';
import { Button } from '@components/button';
import Link from 'next/link';

const Header = ({ data }) => {
  const renderItems = (items) =>
    items.map(({ label, action = () => null, type }, i) => {
      if (type === 'button/primary') {
        return (
          <Button key={i} onClick={() => action()} type={type}>
            {label}
          </Button>
        );
      }
      return (
        <StyledHeader.Item key={i} onClick={() => action()}>
          <StyledHeader.Link href="">{label}</StyledHeader.Link>
        </StyledHeader.Item>
      );
    });

  if (data) {
    return (
      <StyledHeader>
        <StyledHeader.Wrapper>
          <StyledHeader.Section>
            <StyledHeader.Logo>App.co</StyledHeader.Logo>
            {renderItems(data.left)}
          </StyledHeader.Section>
          <StyledHeader.Section>{renderItems(data.right)}</StyledHeader.Section>
        </StyledHeader.Wrapper>
        <StyledHeader.Illustration src="/static/images/hero-illustration/illustration@3x.png" />
      </StyledHeader>
    );
  }
  return null;
};

export { Header };

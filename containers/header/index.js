import React from 'react';
import { StyledHeader } from '@components/header';
import { Button } from '@components/button';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitModalOpen: false,
      whatsADappOpen: false,
      whoWeAreOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({
      submitModalOpen: true,
    });
  }

  render() {
    return (
      <>
        <StyledHeader>
          <StyledHeader.Wrapper>
            <StyledHeader.Section>
              <StyledHeader.Logo>
                <StyledHeader.LogoLink href="/">App.co</StyledHeader.LogoLink>
              </StyledHeader.Logo>
              <StyledHeader.Item>
                <StyledHeader.Link href="/faq#whats-a-dapp">
                  What's a Dapp?
                </StyledHeader.Link>
              </StyledHeader.Item>
              <StyledHeader.Item>
                <StyledHeader.Link href="/faq#about">
                  About App.co
                </StyledHeader.Link>
              </StyledHeader.Item>
            </StyledHeader.Section>
            <StyledHeader.Section>
              <Button type="button/primary" href="/submit">
                Add your Dapp
              </Button>
            </StyledHeader.Section>
          </StyledHeader.Wrapper>
        </StyledHeader>
      </>
    );
  }
}

export { Header };

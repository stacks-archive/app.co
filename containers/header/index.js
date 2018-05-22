import React from 'react';

import { StyledHeader } from '@components/header';
import { Button } from '@components/button';
import SubmitDapp from '@containers/modals/submit-dapp';
import WhatsADapp from '@containers/modals/whats-a-dapp';
import WhoWeAre from '@containers/modals/who-we-are';

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
      <StyledHeader>
        <StyledHeader.Wrapper>
          <StyledHeader.Section>
            <StyledHeader.Logo>
              <StyledHeader.LogoLink href="/">App.co</StyledHeader.LogoLink>
            </StyledHeader.Logo>
            <StyledHeader.Item>
              <StyledHeader.Link href="/faq#whats-a-dapp">What's a Dapp?</StyledHeader.Link>
            </StyledHeader.Item>
            <StyledHeader.Item>
              <StyledHeader.Link href="/faq#about">About App.co</StyledHeader.Link>
            </StyledHeader.Item>
          </StyledHeader.Section>
          <StyledHeader.Section>
            <Button type="button/primary" href="/submit">
              Add your Dapp
            </Button>
          </StyledHeader.Section>
        </StyledHeader.Wrapper>

        <SubmitDapp
          open={this.state.submitModalOpen}
          constants={this.props.data.constants.appConstants}
          apiServer={this.props.data.apiServer}
          close={() => this.setState({ submitModalOpen: false })}
        />
        <WhatsADapp open={this.state.whatsADappOpen} close={() => this.setState({ whatsADappOpen: false })} />
        <WhoWeAre open={this.state.whoWeAreOpen} close={() => this.setState({ whoWeAreOpen: false })} />
      </StyledHeader>
    );
  }
}

export { Header };

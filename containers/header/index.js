import React from 'react';
import { StyledHeader } from '@components/header';
import { Button } from '@components/button';
import SubmitDapp from '@containers/modals/submit-dapp';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitModalOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.modal = this.modal.bind(this);
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
            <StyledHeader.Logo>App.co</StyledHeader.Logo>
            <StyledHeader.Item onClick={() => {}}>
              <StyledHeader.Link href="">What's a Dapp?</StyledHeader.Link>
            </StyledHeader.Item>
            <StyledHeader.Item onClick={() => {}}>
              <StyledHeader.Link href="">Who we are</StyledHeader.Link>
            </StyledHeader.Item>
          </StyledHeader.Section>
          <StyledHeader.Section>
            <Button type="button/primary" onClick={this.openModal} href="">
              Add your Dapp
            </Button>
          </StyledHeader.Section>
        </StyledHeader.Wrapper>
        <StyledHeader.Illustration src="/static/images/hero-illustration/illustration@3x.png" />
        <SubmitDapp open={this.state.submitModalOpen} close={() => this.setState({ submitModalOpen: false })} />
      </StyledHeader>
    );
  }
}

export { Header };

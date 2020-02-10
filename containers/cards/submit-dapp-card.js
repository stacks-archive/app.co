import React from 'react';
import Cards from '@components/card';
import SubmitDappModal from '@containers/modals/submit-dapp';
import { Button } from '@components/button';

export default class SubmitDappCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  render() {
    console.log(this);
    return (
      <Cards.GrayCard>
        {/* <Cards.SubmitDappIllustration src="/static/images/submit-dapp-card-illustration/illustration@3x.png" /> */}
        <h3>Don't see your Dapp listed?</h3>
        <br />
        <p>
          Hello developer! We'd love to see your hard work listed here. Click
          below to submit your decentralized application.
        </p>

        <br />
        <br />
        <br />
        <br />

        {/* <Button type="button/primary"> */}
        <Button
          type="button/primary"
          onClick={() => {
            this.setState({ modalOpen: true });
          }}
        >
          Submit yours now
        </Button>

        <SubmitDappModal
          open={this.state.modalOpen}
          close={() => this.setState({ modalOpen: false })}
        />
      </Cards.GrayCard>
    );
  }
}

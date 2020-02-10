import React from 'react';

import { Section, Caret } from '@components/mining-admin/collapsable';

export default class Collapsable extends React.Component {
  state = {
    open: false,
  };

  toggleCollapsed() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <Section open={this.state.open}>
        <h2 onClick={() => this.toggleCollapsed()}>
          <Caret open={this.state.open} />
          {this.props.title}
        </h2>
        {this.state.open && this.props.children}
      </Section>
    );
  }
}

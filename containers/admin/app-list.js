import React from 'react';
import Link from 'next/link';
import download from 'downloadjs';
import { connect } from 'react-redux';

import { Table, Th, Thead, Td, SpacedTd } from '@components/mining-admin/table';
import { Section, Content } from '@components/mining-admin/month';

const appRows = apps =>
  apps.map(app => (
    <tr key={app.id}>
      <Td>
        <Link href={`/admin/app?id=${app.id}`}>
          <a target="_blank">{app.name}</a>
        </Link>
      </Td>
      <SpacedTd>{app.category}</SpacedTd>
      <SpacedTd>{app.authentication}</SpacedTd>
      <SpacedTd>{app.status}</SpacedTd>
    </tr>
  ));

class AppList extends React.Component {
  async downloadAllApps() {
    const url = `${process.env.API_SERVER}/api/admin/download-apps`;
    const res = await fetch(url, {
      headers: new Headers({
        Authorization: `Bearer ${this.props.jwt}`,
      }),
    });
    const blob = await res.blob();
    download(blob, 'App-co Apps.csv', 'text/csv');
  }

  render() {
    const { apps, title } = this.props;
    return (
      <Section>
        <h1>{title}</h1>
        <Content>
          <a href="javascript:void(0)" onClick={() => this.downloadAllApps()}>
            Download all apps
          </a>
        </Content>
        <Table>
          <Thead>
            <tr>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Authentication</Th>
              <Th>Status</Th>
            </tr>
          </Thead>
          <tbody>{appRows(apps)}</tbody>
        </Table>
      </Section>
    );
  }
}

const mapStateToProps = state => ({
  jwt: state.user.jwt,
});

export default connect(mapStateToProps)(AppList);

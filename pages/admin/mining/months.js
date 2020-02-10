import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import Link from 'next/link';
import download from 'downloadjs';

import MiningActions from '@stores/mining-admin/actions';

import { Table, Td, SpacedTd, Th } from '@components/mining-admin/table';
import StyledMonth from '@components/mining-admin/month';
import ReportStatus from '@containers/admin/report-status';
import AdminLayout from '@containers/admin/layout';

class MiningMonths extends React.Component {
  componentDidMount() {
    this.props.fetchMiningMonths();
  }

  async download() {
    const url = `${process.env.API_SERVER}/api/admin/mining-ready-apps`;
    const res = await fetch(url, {
      headers: new Headers({
        Authorization: `Bearer ${this.props.jwt}`,
      }),
    });
    const blob = await res.blob();
    download(blob, 'app-mining-rankings.csv', 'text/csv');
  }

  monthsList() {
    if (!this.props.months) {
      return '';
    }

    return this.props.months.map(month => {
      const date = moment(`${month.month} ${month.year}`, 'M YYYY');
      return (
        <tr key={month.id}>
          <Td>
            <Link href={`/admin/mining/months/${month.id}`}>
              {date.format('MMMM YYYY')}
            </Link>
          </Td>
          <SpacedTd textAlign="right">
            <ReportStatus status={month.status} />
          </SpacedTd>
        </tr>
      );
    });
  }

  months() {
    return (
      <>
        <StyledMonth.Section mb={4}>
          <StyledMonth.Content pl={5} fontSize={12}>
            <a
              href="javascript:void(0)"
              onClick={() => {
                this.download();
              }}
            >
              Download registered apps
            </a>
          </StyledMonth.Content>
        </StyledMonth.Section>

        <Table>
          <thead>
            <tr>
              <Th>Month</Th>
              <Th textAlign="right">Status</Th>
            </tr>
          </thead>
          <tbody>{this.monthsList()}</tbody>
        </Table>
      </>
    );
  }

  render() {
    return (
      <AdminLayout>
        <br />
        <br />
        {this.months()}
        <br />
        <br />
      </AdminLayout>
    );
  }
}

const mapStateToProps = state => ({
  months: state.miningAdmin.months,
  jwt: state.user.jwt,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, MiningActions), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiningMonths);

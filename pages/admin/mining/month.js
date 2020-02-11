import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import NotificationSystem from 'react-notification-system';
import Link from 'next/link';
import { Box } from 'blockstack-ui';
import Router from 'next/router';
import download from 'downloadjs';
import { CheckboxStateless as Checkbox } from '@atlaskit/checkbox';

import MiningActions from '@stores/mining-admin/actions';

import StyledMonth from '@components/mining-admin/month';
import Collapsable from '@containers/admin/collapsable';
import { Input, Button } from '@components/mining-admin/collapsable';
import {
  FormTd,
  Table,
  Td,
  Thead,
  Th,
  SpacedTd
} from '@components/mining-admin/table';
import ReportStatus from '@containers/admin/report-status';
import { Type } from '@components/typography';
import { monthName } from '@utils/admin';
import AdminLayout from '@containers/admin/layout';

class MiningMonth extends React.Component {
  state = {
    purchasedAt: '',
    purchaseExchangeName: '',
    BTCTransactionId: '',
    purchaseConversionRate: '',
    stxPayoutTotal: '',
    stxPayoutDecay: '',
    stxPayoutConversionRate: 0.3,
    stxPayoutIsIOU: false,
    status: '',
    name: ''
  };

  static propTypes = {
    fetchMiningMonths: PropTypes.func.isRequired,
    saveMonth: PropTypes.func.isRequired,
    month: PropTypes.object,
    id: PropTypes.string.isRequired
  };

  static defaultProps = {
    month: null
  };

  static getInitialProps({ req }) {
    const { id } = req.params;
    return {
      id
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.state.purchasedAt && nextProps.month) {
      this.setState({ ...nextProps.month });
    }
  }

  componentDidMount() {
    this.props.fetchMiningMonths();
  }

  save() {
    const data = { ...this.state };
    if (this.state.purchasedAt) {
      const date = moment(this.state.purchasedAt).utcOffset(-4);
      data.purchasedAt = date.format();
    }
    console.log(data);
    this.props.saveMonth(data);
    this.notifications.addNotification({
      message: `Report for ${this.monthName()} was saved successfully.`,
      level: 'success'
    });
  }

  publish() {
    this.setState({ status: 'published' }, () => {
      this.save();
    });
  }

  unpublish() {
    this.setState({ status: 'pending' }, () => {
      this.save();
    });
  }

  deleteReviewer(reviewer) {
    this.props.deleteReviewer(reviewer);
    Router.push(document.location.pathname);
  }

  monthName() {
    return monthName(this.props.month);
  }

  async downloadRankings() {
    const { jwt, id } = this.props;
    const url = `${process.env.API_SERVER}/api/admin/mining-reports/${id}/download-rankings`;
    const res = await fetch(url, {
      headers: new Headers({
        Authorization: `Bearer ${jwt}`
      })
    });
    const blob = await res.blob();
    download(blob, `${this.monthName()} Rankings.csv`, 'text/csv');
  }

  reviewers() {
    return this.props.month.MiningReviewerReports.map(report => (
      <tr key={report.id}>
        <Td>
          <Link
            href={`/admin/mining/months/${this.props.id}/reviewers/${report.id}`}
          >
            <a>{report.reviewerName}</a>
          </Link>
        </Td>
        <Td>
          <a
            href="javascript:void(0)"
            onClick={() => this.deleteReviewer(report)}
          >
            <Type.span textAlign="right" fontSize="12px" display="block">
              Delete
            </Type.span>
          </a>
        </Td>
      </tr>
    ));
  }

  composite() {
    // console.log(this.props.month.compositeRankings)
    const { blockExplorerUrl, BTCTransactionId } = this.props.month;
    return this.props.month.compositeRankings.map((app, index) => {
      let payment = null;
      this.props.month.MiningAppPayouts.forEach(_payment => {
        if (_payment.appId === app.id) {
          payment = _payment;
        }
      });
      return (
        <tr key={app.id}>
          <SpacedTd>{index + 1}</SpacedTd>
          <SpacedTd>{app.name}</SpacedTd>
          <SpacedTd>{app.domain}</SpacedTd>
          <SpacedTd>{app.BTCAddress}</SpacedTd>
          <Td>
            {payment && (
              <a
                href={`${blockExplorerUrl}/${BTCTransactionId}`}
                target="_blank"
              >
                {payment.BTCPaymentValue / 10e7} BTC
              </a>
            )}
          </Td>
        </tr>
      );
    });
  }

  month() {
    const date = this.monthName();
    return (
      <>
        <StyledMonth.Section>
          <h1>{date}</h1>
          <StyledMonth.Content>
            <ReportStatus status={this.state.status} />
          </StyledMonth.Content>
        </StyledMonth.Section>

        <Collapsable title="General Information">
          <div style={{ paddingBottom: '1em' }}>
            <Table>
              <tbody>
                <tr>
                  <FormTd>Report Name</FormTd>
                  <FormTd textAlign="right">
                    <Input
                      type="text"
                      value={this.state.name}
                      onChange={evt =>
                        this.setState({ name: evt.target.value })
                      }
                    />
                  </FormTd>
                </tr>
              </tbody>
            </Table>
            <Button onClick={() => this.save()}>Save</Button>
          </div>
        </Collapsable>

        <Collapsable title="BTC transactions">
          <div style={{ paddingBottom: '1em' }}>
            <Table>
              <tbody>
                <tr>
                  <FormTd>Purchase Exchange Name</FormTd>
                  <FormTd textAlign="right">
                    <Input
                      type="text"
                      value={this.state.purchaseExchangeName}
                      onChange={evt =>
                        this.setState({
                          purchaseExchangeName: evt.target.value
                        })
                      }
                    />
                  </FormTd>
                </tr>
                <tr>
                  <FormTd>Purchase date</FormTd>
                  <FormTd textAlign="right">
                    <Input
                      type="datetime-local"
                      value={moment(this.state.purchasedAt).format(
                        'YYYY-MM-DDTHH:mm'
                      )}
                      onChange={evt =>
                        this.setState({ purchasedAt: evt.target.value })
                      }
                    />
                  </FormTd>
                </tr>
                <tr>
                  <FormTd>Purchase conversion rate (USD-to-BTC)</FormTd>
                  <FormTd textAlign="right">
                    <Input
                      type="number"
                      value={this.state.purchaseConversionRate}
                      onChange={evt =>
                        this.setState({
                          purchaseConversionRate: evt.target.value
                        })
                      }
                    />
                  </FormTd>
                </tr>
                <tr>
                  <FormTd>
                    BTC Payout Total
                  </FormTd>
                  <FormTd textAlign="right">
                    <Input
                      type="number"
                      value={this.state.btcPayoutTotal}
                      onChange={(evt) => this.setState({ btcPayoutTotal: evt.target.value })}
                    />
                  </FormTd>
                </tr>
                <tr>
                  <FormTd>
                    BTC Payout Decay Rate (%)
                  </FormTd>
                  <FormTd textAlign="right">
                    <Input
                      type="number"
                      value={this.state.btcPayoutDecay}
                      onChange={(evt) => this.setState({ btcPayoutDecay: evt.target.value })}
                    />
                  </FormTd>
                </tr>
              </tbody>
            </Table>
            <Button onClick={() => this.save()}>Save</Button>
          </div>
        </Collapsable>

        <Collapsable title="STX Payout">
          <div style={{ paddingBottom: '1em' }}>
            <Table>
              <tbody>
                <tr>
                  <FormTd>STX Payout Total</FormTd>
                  <FormTd textAlign="right">
                    <Input
                      type="number"
                      value={this.state.stxPayoutTotal}
                      onChange={evt =>
                        this.setState({ stxPayoutTotal: evt.target.value })
                      }
                    />
                  </FormTd>
                </tr>
                <tr>
                  <FormTd>STX Payout Decay Rate (%)</FormTd>
                  <FormTd textAlign="right">
                    <Input
                      type="number"
                      value={this.state.stxPayoutDecay}
                      onChange={evt =>
                        this.setState({ stxPayoutDecay: evt.target.value })
                      }
                    />
                  </FormTd>
                </tr>
                <tr>
                  <FormTd>STX Payout Conversion Rate to USD</FormTd>
                  <FormTd textAlign="right">
                    <Input
                      type="number"
                      value={this.state.stxPayoutConversionRate}
                      onChange={evt =>
                        this.setState({
                          stxPayoutConversionRate: evt.target.value
                        })
                      }
                    />
                  </FormTd>
                </tr>
                <tr>
                  <FormTd>STX Payout is an IOU</FormTd>
                  <FormTd textAlign="right">
                    <Checkbox
                      isChecked={this.state.stxPayoutIsIOU}
                      onChange={() =>
                        this.setState({
                          stxPayoutIsIOU: !this.state.stxPayoutIsIOU
                        })
                      }
                      label="STX Payout is an IOU"
                    />
                  </FormTd>
                </tr>
              </tbody>
            </Table>
            <Button onClick={() => this.save()}>Save</Button>
          </div>
        </Collapsable>

        <Collapsable title="Reviewer Reports">
          <Box px={5} py={3} style={{ borderTop: '1px solid #e6e9ee' }}>
            <Link href={`/admin/mining/months/${this.props.id}/upload-report`}>
              <a>
                <Type.span fontSize="12px">Add Report</Type.span>
              </a>
            </Link>
          </Box>
          <Table>
            <tbody>{this.reviewers()}</tbody>
          </Table>
        </Collapsable>

        <Collapsable title="Composite Rankings">
          <StyledMonth.Section>
            <StyledMonth.Content pl={5} fontSize={12}>
              {this.state.status !== 'published' ? (
                <a href="javascript:void(0)" onClick={() => this.publish()}>
                  Publish rankings
                </a>
              ) : (
                <a href="javascript:void(0)" onClick={() => this.unpublish()}>
                  Unpublish rankings
                </a>
              )}
              <a
                href="javascript:void(0)"
                onClick={() => this.downloadRankings()}
                style={{ display: 'inline-block', marginLeft: '10px' }}
              >
                Download Rankings
              </a>
            </StyledMonth.Content>
            <Table>
              <Thead>
                <tr>
                  <Th>Rank</Th>
                  <Th>App name</Th>
                  <Th>App domain</Th>
                  <Th>BTC Address</Th>
                  <Th>Payment</Th>
                </tr>
              </Thead>
              <tbody>{this.composite()}</tbody>
            </Table>
          </StyledMonth.Section>
        </Collapsable>
      </>
    );
  }

  render() {
    return (
      <>
        <NotificationSystem
          ref={c => {
            this.notifications = c;
          }}
        />
        {AdminLayout && (
          <AdminLayout>
            {this.props.month && this.month()}
            <br />
            <br />
          </AdminLayout>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, props) => ({
  month: state.miningAdmin.months.find(
    month => month.id === parseInt(props.id, 10)
  ),
  jwt: state.user.jwt
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...MiningActions }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiningMonth);

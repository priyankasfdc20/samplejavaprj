import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { DataGridCard } from '../../_components';
import ReferralService from '../../_services/referral';
import {
  toCapitalizeCase,
  toDateTimeFormat,
  getCardHeaderText,
} from '../../_utils/formatters';

const TITLE = 'Referrals';

class ReferralsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: TITLE,
      XHRStatus: 'idle',
    };
  }

  static propTypes = {
    staffId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.fetchReferrals();
  }

  fetchReferrals = () => {
    const xhrStatus = 'waiting';
    this.setState({ XHRStatus: xhrStatus });
    this.updateHeaderText(xhrStatus);
    return ReferralService.fetch(this.props.staffId)
      .then(this.onFetchSuccess)
      .catch(this.onFetchFail);
  };

  onFetchSuccess = referrals => {
    const xhrStatus = 'ready';
    this.setState({
      XHRStatus: xhrStatus,
      referrals: referrals,
    });
    this.updateHeaderText(xhrStatus, referrals);
  };

  onFetchFail = () => {
    const xhrStatus = 'error';
    this.setState({ XHRStatus: xhrStatus });
    this.updateHeaderText(xhrStatus);
  };

  updateHeaderText = (xhrStatus, referrals) => {
    const headerText = getCardHeaderText(
      {
        XHRStatus: xhrStatus,
        records: referrals,
      },
      TITLE
    );
    this.setState({ headerText });
  };

  render = () => {
    const { XHRStatus, referrals, headerText } = this.state;
    const isEmpty = !!referrals && !referrals.length;
    const tableOptions = {
      defaultSortName: 'referral_name',
      defaultSortOrder: 'asc',
      sortIndicator: true,
    };
    return (
      <DataGridCard
        cardHeaderText={headerText}
        status={XHRStatus}
        empty={isEmpty}
        renderOnEmpty={() => (
          <div className="row">
            <div className="col-md-9 col-md-offset-3">
              <p>You currently do not have any referrals assigned to you.</p>
            </div>
          </div>
        )}
        render={() => (
          <BootstrapTable
            data={referrals}
            bordered={false}
            options={tableOptions}
          >
            <TableHeaderColumn
              dataField="identifier"
              isKey
              hidden
              dataSort={true}
              sortHeaderColumnClassName="sorted-column"
            >
              Id
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="referral_name"
              defaultASC
              dataSort={true}
              sortHeaderColumnClassName="sorted-column"
            >
              Name
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="referral_response_type"
              dataSort={true}
              sortHeaderColumnClassName="sorted-column"
            >
              Response Time
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="assignment_type"
              dataFormat={toCapitalizeCase}
              dataSort={true}
              sortHeaderColumnClassName="sorted-column"
            >
              Assignment
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="received_datetime"
              dataFormat={toDateTimeFormat}
              dataSort={true}
              sortHeaderColumnClassName="sorted-column"
            >
              Call Date/Time
            </TableHeaderColumn>
          </BootstrapTable>
        )}
      />
    );
  };
}

export default ReferralsTable;

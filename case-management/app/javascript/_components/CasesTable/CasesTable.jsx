import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { DataGridCard, DropDownMenu } from '../../_components';
import {
  toCapitalizeCase,
  toDateFormat,
  getCardHeaderText,
} from '../../_utils/formatters';
import CaseService from '../../_services/case';

const TITLE = 'Cases';

class CasesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: TITLE,
      XHRStatus: 'idle',
    };
  }

  static propTypes = {
    staffId: PropTypes.string.isRequired,
    isActionsColumnShown: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.fetchCases();
  }

  fetchCases = () => {
    const xhrStatus = 'waiting';
    this.setState({ XHRStatus: xhrStatus });
    this.updateHeaderText(xhrStatus);
    return CaseService.fetch(this.props.staffId)
      .then(this.onFetchSuccess)
      .catch(this.onFetchFail);
  };

  onFetchSuccess = cases => {
    const xhrStatus = 'ready';
    this.setState({
      XHRStatus: xhrStatus,
      cases: cases,
    });
    this.updateHeaderText(xhrStatus, cases);
  };

  onFetchFail = () => {
    const xhrStatus = 'error';
    this.setState({ XHRStatus: xhrStatus });
    this.updateHeaderText(xhrStatus);
  };

  updateHeaderText = (xhrStatus, cases) => {
    const headerText = getCardHeaderText(
      {
        XHRStatus: xhrStatus,
        records: cases,
      },
      TITLE
    );
    this.setState({ headerText });
  };

  render = () => {
    const tableOptions = {
      defaultSortName: 'case_name',
      defaultSortOrder: 'asc',
      sortIndicator: true,
    };
    const { isActionsColumnShown } = this.props;
    const { XHRStatus, cases, headerText } = this.state;
    const isEmpty = !!cases && !cases.length;

    return (
      <DataGridCard
        cardHeaderText={headerText}
        status={XHRStatus}
        empty={isEmpty}
        renderOnEmpty={() => (
          <div className="row">
            <div className="col-md-9 col-md-offset-3">
              <p>You currently do not have any cases assigned to you.</p>
            </div>
          </div>
        )}
        render={() => (
          <BootstrapTable data={cases} bordered={false} options={tableOptions}>
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
              dataField="case_name"
              dataSort={true}
              sortHeaderColumnClassName="sorted-column"
            >
              Name
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="active_service_component"
              dataSort={true}
              sortHeaderColumnClassName="sorted-column"
            >
              Service Component
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
              dataField="assignment_start_date"
              dataFormat={toDateFormat}
              dataSort={true}
              sortHeaderColumnClassName="sorted-column"
            >
              Assignment Date
            </TableHeaderColumn>
            {isActionsColumnShown && (
              <TableHeaderColumn
                dataField="client_identifier"
                width="50px"
                dataFormat={clientId => (
                  <div className="dropdown">
                    <DropDownMenu
                      menuItem1={
                        <a href="/clients/index">View Focus Child Profile</a>
                      }
                      menuItem2={
                        <a href={`/placement/client/${clientId}`}>
                          Find Placement Opportunities
                        </a>
                      }
                    />
                  </div>
                )}
              />
            )}
          </BootstrapTable>
        )}
      />
    );
  };
}

export default CasesTable;

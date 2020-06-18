import React from 'react';
import PropTypes from 'prop-types';
import { DropDownField, DateTimePicker, Button } from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { COUNTY_LIST } from '../Constants';

export default class IndianAncestry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNotifications: false,
      indianAncestry: props.indianAncestry,
      newAncestry: {
        child_client_id: 'AazXkWY06s',
        notification_date: '',
        county_code: '',
      },
    };
  }

  handleDropdownChange = name => ({ value }) => {
    this.setState({ newAncestry: { [name]: value } });
  };

  handleOnClick = () => {
    const { addNotifications } = this.state;
    this.setState({ addNotifications: !addNotifications });
  };

  componentWillReceiveProps(nextProps) {
    let indianAncestry = nextProps.indianAncestry;
    this.setState({ indianAncestry });
  }

  notificationInfo = () => {
    if (!this.state.indianAncestry.length) {
      return 'Currently No IndianAncestry Notifications.Click Add Notification to add';
    } else {
      return (
        <BootstrapTable data={this.state.indianAncestry}>
          <TableHeaderColumn dataField="id" isKey hidden dataSort width="150">
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="child_client_id" hidden dataSort>
            child_client ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="county_code" dataSort>
            County
          </TableHeaderColumn>
          <TableHeaderColumn dataField="notification_date" dataSort>
            Notification Date
          </TableHeaderColumn>
        </BootstrapTable>
      );
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <label>
            <h4 htmlFor="Indian Ancestry Notifications">
              Indian Ancestry Notifications
            </h4>
          </label>
        </div>
        <div className="col-md-6">
          <Button
            btnClassName="default pull-right"
            btnName="+Add Notifications"
            onClick={this.handleOnClick}
          />
        </div>
        {this.state.addNotifications && (
          <div>
            <DropDownField
              id="dropdown1"
              gridClassName="col-md-6"
              options={COUNTY_LIST}
              selectedOption={this.state.newAncestry.county_code}
              label="County"
              onChange={this.handleDropdownChange('county_code')}
            />
            <div className="col-md-6">
              <label htmlFor="Date Informed">Date Informed</label>
              <DateTimePicker />
            </div>
            <Button
              btnClassName="default pull-right"
              btnName="Add"
              onClick={this.handleOnClick}
            />
          </div>
        )}
        <div className="col-md-12">{this.notificationInfo()}</div>
      </div>
    );
  }
}

IndianAncestry.propTypes = { indianAncestry: PropTypes.array };
IndianAncestry.defaultProps = {
  indianAncestry: [],
};

import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
  Cards,
  DropDownField,
  DateTimePicker,
  TextArea,
  Button,
} from 'react-wood-duck';
import { REASONS, COUNTY_LIST } from './Constants';

export default class SafetyAlertInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      safetyAlerts: props.safetyAlerts,
      addAlert: false,
    };
  }

  onClick = () => {
    const { addAlert } = this.state;
    this.setState({ addAlert: !addAlert });
  };

  componentWillReceiveProps(nextProps) {
    let safetyAlerts = nextProps.safetyAlerts;
    this.setState({ safetyAlerts });
  }

  alertInfo = () => {
    if (!this.state.safetyAlerts) {
      return 'Currently No SafetyAlerts. Click AddAlert button to add New Alerts';
    } else {
      return (
        <BootstrapTable data={this.state.safetyAlerts}>
          <TableHeaderColumn dataField="activation_date" dataSort>
            Activation Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="client_id" isKey hidden dataSort>
            Client ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="activation_reason_code" dataSort>
            Reason
          </TableHeaderColumn>
          <TableHeaderColumn dataField="deactivation_date" dataSort>
            Deactivation Date
          </TableHeaderColumn>
        </BootstrapTable>
      );
    }
  };

  render() {
    const { safetyAlerts } = this.state;
    return (
      <Cards
        cardHeaderText="Safety Alert Information"
        id={this.props.anchorId}
        cardHeaderButton={false}
        cardActionButtons={true}
      >
        <div className="row">
          <div className="col-md-12">
            <Button
              btnClassName="default pull-right"
              btnName="+Add Alert"
              onClick={this.onClick}
            />
          </div>
          {this.state.addAlert && (
            <div className="form-group">
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <label htmlFor="Safety Alert Activation">
                      Safety Alert Activation
                    </label>
                  </div>
                  <div className="col-md-4 col-sm-6 col-xs-12">
                    <label htmlFor="Activation Date">Activation Date</label>
                    <DateTimePicker />
                  </div>
                  <div className="col-md-4">
                    <DropDownField
                      id="dropdown1"
                      options={COUNTY_LIST}
                      label="County"
                    />
                  </div>
                  <div className="col-md-4">
                    <DropDownField
                      id="dropdown2"
                      selectedOption={safetyAlerts.activation_reason_code}
                      options={REASONS}
                      label="Reason"
                    />
                  </div>
                  <div className="col-md-12">
                    <TextArea
                      labelClassName="form-control"
                      label="Explanation"
                      rows={5}
                      resize={false}
                      name={'Explanation'}
                      placeholder={''}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-12">
                    <label htmlFor="Safety Alert Deactivation">
                      Safety Alert Deactivation
                    </label>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="Deactivation Date">Deactivation Date</label>
                    <DateTimePicker />
                  </div>
                  <div className="col-md-4">
                    <DropDownField
                      id="dropdown1"
                      options={COUNTY_LIST}
                      label="County"
                    />
                  </div>
                  <div className="col-md-12">
                    <TextArea
                      labelClassName="form-control"
                      label="Explanation"
                      rows={5}
                      resize={false}
                      name={'Explanation'}
                      placeholder={''}
                    />
                  </div>
                  <Button
                    btnClassName="default pull-right"
                    btnName="Add"
                    onClick={this.onClick}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="col-md-12">{this.alertInfo()}</div>
        </div>
      </Cards>
    );
  }
}

SafetyAlertInformation.propTypes = {
  safetyAlerts: PropTypes.array,
  anchorId: PropTypes.string,
  REASONS: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  COUNTY_LIST: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

SafetyAlertInformation.defaultProps = {
  REASONS: REASONS,
  COUNTY_LIST: COUNTY_LIST,
};

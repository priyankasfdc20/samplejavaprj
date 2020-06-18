import React from 'react';
import PropTypes from 'prop-types';
import { DropDownField, DateTimePicker, Button } from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { CSEC_TYPES } from '../Constants';

export default class CsecInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addCsec: false,
      csec: props.csecResponse,
      newCsec: {
        child_client_id: 'AazXkWY06s',
        end_date: '',
        sexual_exploitation_type: '',
        start_date: '',
      },
    };
  }

  displayOnClick = () => {
    const { addCsec } = this.state;
    this.setState({ addCsec: !addCsec });
  };

  handleChange = name => ({ value }) => {
    this.setState({ newCsec: { [name]: value } });
  };

  componentWillReceiveProps(nextProps) {
    let csec = nextProps.csecResponse;
    this.setState({ csec });
  }

  csecData = () => {
    if (this.state.csec.length < 1) {
      return 'Currently No CSEC Information. Click Add Csec to add Csec Data';
    } else {
      return (
        <BootstrapTable data={this.state.csec}>
          <TableHeaderColumn
            dataField="sexual_exploitation_type"
            isKey
            dataSort
            width="150"
          >
            CSEC Type
          </TableHeaderColumn>
          <TableHeaderColumn dataField="start_date" dataSort width="150">
            Start Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="end_date" dataSort width="150">
            End Date
          </TableHeaderColumn>
        </BootstrapTable>
      );
    }
  };

  render() {
    return (
      <div className="row">
        <div className="form-group">
          <div className="col-md-6">
            <label>
              <h4 htmlFor="CSEC Information">CSEC Information</h4>
            </label>
          </div>
          <div className="col-md-6">
            <Button
              btnClassName="default pull-right"
              btnName="+Add CSEC Incident"
              onClick={this.displayOnClick}
            />
          </div>
          {this.state.addCsec && (
            <div>
              <DropDownField
                id="dropdown6"
                gridClassName="col-md-4"
                options={CSEC_TYPES}
                label="CSEC Data Type"
                selectedOption={this.state.newCsec.sexual_exploitation_type}
                onChange={this.handleChange('sexual_exploitation_type')}
              />
              <div className="col-md-4">
                <label htmlFor="START DATE">START DATE</label>
                <DateTimePicker />
              </div>
              <div className="col-md-4">
                <label htmlFor="END DATE">END DATE</label>
                <DateTimePicker />
              </div>
              <Button
                btnClassName="default pull-right"
                btnName="Add"
                onClick={this.displayOnClick}
              />
            </div>
          )}
          <div className="col-md-12">{this.csecData()} </div>
        </div>
      </div>
    );
  }
}

CsecInformation.propTypes = { csecResponse: PropTypes.array };
CsecInformation.defaultProps = {
  csecResponse: [],
};

import React from 'react';
import PropTypes from 'prop-types';
import { DropDownField, InputComponent } from 'react-wood-duck';
import {
  LITERATE,
  INCAPACITATED_PARENT,
  MARITAL_STATUS,
  STATE_TYPES,
} from '../Constants';

export default class OtherClientInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      childClient: props.childClient,
    };
  }

  componentWillReceiveProps(nextProps) {
    let childClient = nextProps.childClient;
    this.setState({ childClient });
  }

  handleOnChange = name => ({ value }) => {
    const { childClient } = this.state;
    this.setState({ childClient: { ...childClient, [name]: value } });
  };

  render() {
    const { childClient } = this.state;
    return (
      <div className="row">
        <div className="form-group">
          <div className="col-md-12">
            <label>
              <h4 htmlFor="Other Information">Other Information</h4>
            </label>
          </div>
          <DropDownField
            id="dropdown2"
            gridClassName="col-md-6 col-sm-6 col-xs-12"
            selectedOption={String(childClient.marital_status_type)}
            options={MARITAL_STATUS}
            label="Marital Status"
            onChange={this.handleOnChange('marital_status_type')}
          />
          <DropDownField
            id="dropdown3"
            gridClassName="col-md-6 col-sm-6 col-xs-12"
            selectedOption={childClient.litrate_code}
            options={LITERATE}
            label="Literate"
            onChange={this.handleOnChange('litrate_code')}
          />
          <DropDownField
            id="dropdown5"
            gridClassName="col-md-6 col-sm-6 col-xs-12"
            selectedOption={String(childClient.driver_license_state_code_type)}
            options={STATE_TYPES}
            label="Drivers License State"
            onChange={this.handleOnChange('driver_license_state_code_type')}
          />
          <InputComponent
            gridClassName="col-md-6 col-sm-6 col-xs-12"
            fieldClassName="form-group"
            label="Drivers License # "
            type="string"
            value={childClient.driver_license_number}
            onChange={this.handleOnChange('driver_license_number')}
          />
          <DropDownField
            id="dropdown7"
            gridClassName="col-md-6 col-sm-6 col-xs-12"
            selectedOption={childClient.incapacitated_parent_code}
            options={INCAPACITATED_PARENT}
            label="Incapacitated Parent"
            onChange={this.handleOnChange('incapacitated_parent_code')}
          />
          <InputComponent
            gridClassName="col-md-6 col-sm-6 col-xs-12"
            fieldClassName="form-group"
            label="Alien Registration#"
            type="number"
            value={childClient.alien_registration_number}
            onChange={this.handleOnChange('alien_registration_number')}
          />
        </div>
      </div>
    );
  }
}

OtherClientInformation.propTypes = {
  childClient: PropTypes.object,
};
OtherClientInformation.defaultProps = {
  childClient: {},
};

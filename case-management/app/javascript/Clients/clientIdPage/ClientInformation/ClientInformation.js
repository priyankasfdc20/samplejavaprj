import React from 'react';
import PropTypes from 'prop-types';
import { DropDownField, InputComponent } from 'react-wood-duck';
import { getAgeUtil, estimatedDoB } from '../../../_utils/ageCalc/getAgeFormat';
import { CheckBoxRadio } from '../../../_components';
import DropDown from '../../../_components/DropDown/DropDown';

import {
  GENDERS,
  AGE_UNITS,
  NAME_TYPES,
  PREFIX,
  SUFFIX,
  PRIMARY_LANGUAGES,
  SECONDARY_LANGUAGES,
} from '../Constants';

export default class ClientInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childClient: props.childClient,
      anchorId: props.anchorId,
      value: '',
      selected: [],
      age: '',
      ageUnitValue: '',
      valid: {
        firstNameValid: true,
        middleNameValid: true,
        lastNameValid: true,
        sciIndexNumberValid: true,
      },
      errorMessage: {
        firstNameError: '',
        middleNameError: '',
        lastNameError: '',
        sciIndexNumberError: '',
      },
      dateOfBirth: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    let childClient = nextProps.childClient;
    this.setState({ childClient });
    this.displayAge();
    this.checkDOB();
  }

  handleInputChange = name => event => {
    const { childClient } = this.state;
    this.setState({
      childClient: { ...childClient, [name]: event.target.value },
    });
    this.validateField(name, event.target.value);
  };

  validateField = (fieldName, value) => {
    let errorMessage = this.state.errorMessage;
    switch (fieldName) {
      case 'common_first_name':
        const firstNameValid = /^(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/i.test(value);
        errorMessage.firstNameError = firstNameValid
          ? ''
          : 'Enter at least one alpha character / No special characters';
        break;
      case 'common_middle_name':
        const middleNameValid = /^(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/i.test(value);
        errorMessage.middleNameError = middleNameValid
          ? ''
          : 'Enter at least one alpha character / No special characters';
        break;
      case 'common_last_name':
        const lastNameValid = /^(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/i.test(value);
        errorMessage.lastNameError = lastNameValid
          ? ''
          : 'Enter at least one alpha character / No special characters';
        break;
      case 'sci_index_number':
        const sciIndexNumberValid = /^[a-zA-Z0-9]{0,10}$/i.test(value);
        errorMessage.sciIndexNumberError = sciIndexNumberValid
          ? ''
          : 'Not more than 10 Characters / No Special Characters';
        break;
      default:
        break;
    }
  };

  handleConfidentiality = event => {
    const { childClient } = this.state;
    this.setState({
      childClient: {
        ...childClient,
        confidentiality_in_effect_ind: event.target.checked,
      },
    });
  };

  checkDOB = event => {
    if (this.state.childClient.estimated_dob_code === 'N') {
      this.setState({
        dateOfBirth: this.state.childClient.birth_dt,
      });
    } else {
      this.setState({
        dateOfBirth: '',
      });
    }
  };

  handleMinorNMD = event => {
    const { childClient } = this.state;
    this.setState({
      childClient: {
        ...childClient,
        minor_nmd_parent_indicator: event.target.checked,
      },
    });
  };

  handleSafelySurrendered = event => {
    const { childClient } = this.state;
    this.setState({
      childClient: {
        ...childClient,
        safely_surrended_babies_indicator_var: event.target.checked,
      },
    });
  };

  handleOutstandingWarrant = event => {
    const { childClient } = this.state;
    this.setState({
      childClient: {
        ...childClient,
        outstanding_warrant_indicator: event.target.checked,
      },
    });
  };

  handleDropDownChange = name => ({ value }) => {
    const { childClient } = this.state;
    this.setState({ childClient: { ...childClient, [name]: value } });
  };

  handleAgeUnits = name => ({ value }) => {
    const { childClient } = this.state;
    this.setState({
      [name]: value,
      childClient: {
        ...childClient,
        estimated_dob_code: 'Y',
      },
    });
    if (this.state.age === '') {
      this.setState({
        age: 1,
      });
    }
  };

  getAge = birthDate => getAgeUtil(birthDate);

  handleDobChange = event => {
    const { childClient } = this.state;
    const ageValue = this.getAge(event.target.value);
    let estimatedValue = 'N';
    if (event.target.value === '') {
      estimatedValue = 'Y';
    }
    this.setState({
      dateOfBirth: event.target.value,
      age: ageValue.age,
      ageUnitValue: ageValue.ageUnitSelection,
      childClient: {
        ...childClient,
        estimated_dob_code: estimatedValue,
      },
    });
  };

  displayAge = () => {
    const birth = getAgeUtil(this.state.childClient.birth_dt);
    this.setState({
      age: birth.age,
      ageUnitValue: birth.ageUnitSelection,
    });
    return birth;
  };

  handleAge = event => {
    const { childClient } = this.state;
    this.setState({
      age: event.target.value,
      ageUnitValue: 'years',
      childClient: {
        ...childClient,
        estimated_dob_code: 'Y',
      },
    });
  };

  getEstimatedDob = () => {
    let estimatedDob = estimatedDoB(this.state.age, this.state.ageUnitValue);
    return estimatedDob;
  };

  render() {
    const { childClient, anchorId, valid, errorMessage } = this.state;
    return (
      <div id={anchorId}>
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="Client ID ">
              Client ID : {childClient.ui_identifier}
            </label>
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <DropDownField
              gridClassName="col-md-1 col-sm-6 col-xs-12"
              options={PREFIX}
              label="Prefix"
              selectedOption={childClient.name_prefix_description}
              onChange={this.handleDropDownChange('name_prefix_description')}
            />
            <InputComponent
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              label="First Name (required)"
              type="string"
              value={childClient.common_first_name}
              onChange={this.handleInputChange('common_first_name')}
              validationErrorMessage={errorMessage.firstNameError}
              validationError={valid.firstNameValid}
            />
            <InputComponent
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              label="Middle Name"
              type="string"
              value={childClient.common_middle_name}
              onChange={this.handleInputChange('common_middle_name')}
              validationErrorMessage={errorMessage.middleNameError}
              validationError={valid.middleNameValid}
            />
            <InputComponent
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              label="Last Name (required)"
              type="string"
              value={childClient.common_last_name}
              onChange={this.handleInputChange('common_last_name')}
              validationErrorMessage={errorMessage.lastNameError}
              validationError={valid.lastNameValid}
            />
            <DropDownField
              gridClassName="col-md-2 col-sm-6 col-xs-12"
              options={SUFFIX}
              label="Suffix"
              selectedOption={childClient.suffix_title_description}
              onChange={this.handleDropDownChange('suffix_title_description')}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <DropDownField
              gridClassName="col-md-4 col-sm-6 col-xs-12"
              selectedOption={String(childClient.name_type)}
              options={NAME_TYPES}
              label="Name Type (required)"
              onChange={this.handleDropDownChange('name_type')}
            />
            <InputComponent
              label="Client Index Number (CIN)"
              gridClassName="col-md-4 col-sm-3 col-xs-3"
              type="string"
              fieldClassName="uppercase"
              maxLength={10}
              value={childClient.sci_index_number}
              onChange={this.handleInputChange('sci_index_number')}
              validationErrorMessage={errorMessage.sciIndexNumberError}
              validationError={valid.sciIndexNumberValid}
            />
            <InputComponent
              gridClassName="col-md-4 col-sm-6 col-xs-12"
              label="SSN"
              type="number"
              value={childClient.social_security_number}
              onChange={this.handleInputChange('social_security_number')}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <DropDownField
              name="Gender"
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              selectedOption={childClient.gender_code}
              options={GENDERS}
              label="Sex at birth(required)"
              onChange={this.handleDropDownChange('gender_code')}
            />
            <InputComponent
              label="Date Of Birth"
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              type="date"
              value={this.state.dateOfBirth}
              onChange={this.handleDobChange}
            />
            <InputComponent
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              label="Age"
              type="number"
              value={this.state.age}
              onChange={this.handleAge}
              disabled={childClient.estimated_dob_code === 'N'}
            />
            <DropDown
              label="Age Unit"
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              selectedOption={this.state.ageUnitValue}
              options={AGE_UNITS}
              disabled={childClient.estimated_dob_code === 'N'}
              onChange={this.handleAgeUnits('ageUnitValue')}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <DropDownField
              gridClassName="col-md-6 col-sm-6 col-xs-12"
              selectedOption={String(childClient.primary_language_type)}
              options={PRIMARY_LANGUAGES}
              label="Client's Primary Language"
              onChange={this.handleDropDownChange('primary_language_type')}
            />
            <DropDownField
              gridClassName="col-md-6 col-sm-6 col-xs-12"
              selectedOption={String(childClient.secondary_language_type)}
              options={SECONDARY_LANGUAGES}
              label="Secondary Language"
              onChange={this.handleDropDownChange('secondary_language_type')}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <div className="col-md-6">
              <CheckBoxRadio
                id="checkbox1"
                label="Confidentiality is in effect"
                type="checkbox"
                onChange={this.handleConfidentiality}
                checked={childClient.confidentiality_in_effect_ind}
              />
            </div>
            <div className="col-md-6">
              <CheckBoxRadio
                id="checkbox2"
                label="Client is a Minor/NMD Parent"
                type="checkbox"
                onChange={this.handleMinorNMD}
                checked={childClient.minor_nmd_parent_indicator}
              />
            </div>
            <div className="col-md-12">
              {this.state.childClient.confidentiality_in_effect_ind && (
                <InputComponent
                  label="Effective Date"
                  gridClassName="col-md-4 col-sm-6 col-xs-12"
                  type="date"
                  value={childClient.confidentiality_action_date}
                  onChange={this.handleDropDownChange(
                    'confidentiality_action_date'
                  )}
                />
              )}
            </div>
            <div className="col-md-6">
              <CheckBoxRadio
                id="checkbox3"
                label="Client is a Safely Surrendered Baby"
                type="checkbox"
                onChange={this.handleSafelySurrendered}
                checked={childClient.safely_surrended_babies_indicator_var}
              />
            </div>
            <div className="col-md-6">
              <CheckBoxRadio
                id="checkbox4"
                label="Outstanding Warrant Exists"
                type="checkbox"
                onChange={this.handleOutstandingWarrant}
                checked={childClient.outstanding_warrant_indicator}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ClientInformation.propTypes = {
  childClient: PropTypes.object,
  anchorId: PropTypes.string,
};
ClientInformation.defaultProps = {
  childClient: {},
};

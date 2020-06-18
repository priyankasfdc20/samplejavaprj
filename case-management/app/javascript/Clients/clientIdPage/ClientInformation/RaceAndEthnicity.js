import React from 'react';
import PropTypes from 'prop-types';
import { DropDownField, CheckboxRadioGroup, Button } from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
  RACE,
  ICWA_ELIGIBLE,
  UNABLE_TO_DETERMINE_REASON,
  HISPANIC,
  OTHER_ETHNICITY,
} from '../Constants';
import { formatTable } from '../../../_utils/formatters';
import MultiSelect from '../../../_components/MultiSelect';

export default class RaceAndEthnicity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      value: '',
      other: [],
      hispanic: [],
      selected: [],
      unableToDetermine: false,
      addOtherEthnicity: false,
      unableToDetermineReason: '',
      childClient: props.childClient,
    };
    this.handleOtherEthnicity = this.handleOtherEthnicity.bind();
  }

  componentWillReceiveProps(nextProps) {
    let childClient = nextProps.childClient;
    const hispanic = this.valueToString(childClient.hispanic_origin_code);
    const selected = this.icwaToString(childClient.icwa_eligibility_code);
    this.setState({ childClient, hispanic, selected });
  }

  handlePrimaryRace = name => ({ value }) => {
    const { childClient } = this.state;
    let unableToDetermine;
    unableToDetermine = value === 'Unable to Determine*';
    this.setState({
      childClient: { ...childClient, [name]: value },
      unableToDetermine,
    });
  };

  handleDropdownChange = name => ({ value }) => {
    const { childClient } = this.state;
    this.setState({ childClient: { ...childClient, [name]: value } });
  };

  handleUnableToDetermine = name => ({ value }) => {
    const { childClient } = this.state;
    this.setState({ childClient: { ...childClient, [name]: value } });
  };

  handleOtherEthnicity = name => value => {
    const { childClient } = this.state;
    childClient.other_ethnicity = [value];
    this.setState({
      childClient: {
        ...childClient,
        [name]: value,
      },
    });
  };

  onClick = () => {
    this.state.addOtherEthnicity === false
      ? this.setState({ addOtherEthnicity: true })
      : this.setState({ addOtherEthnicity: false });
  };

  raceAndEthnicity = () => {
    const ethnicities = formatTable(this.state.childClient.other_ethnicity);
    if (
      this.state.childClient.primary_race === 'Declines to state*' ||
      this.state.childClient.primary_race === 'Unable to Determine*'
    ) {
      return '';
    } else if (ethnicities.length < 1) {
      return 'No Ethnicities exist at the moment';
    } else {
      return (
        <BootstrapTable data={ethnicities}>
          <TableHeaderColumn dataField="otherEthnicity" isKey dataSort>
            Other Ethnicity
          </TableHeaderColumn>
        </BootstrapTable>
      );
    }
  };

  valueToString = code => {
    let hispanic;
    switch (code) {
      case 'Y':
        hispanic = HISPANIC[0];
        break;
      case 'N':
        hispanic = HISPANIC[1];
        break;

      case 'U':
        hispanic = HISPANIC[2];
        break;

      case 'Z':
        hispanic = HISPANIC[3];
        break;
      default:
        hispanic = [];
    }
    return hispanic;
  };

  icwaToString = codeToString => {
    let selected;
    switch (codeToString) {
      case 'Y':
        selected = ICWA_ELIGIBLE[0];
        break;
      case 'N':
        selected = ICWA_ELIGIBLE[1];
        break;
      case 'U':
        selected = ICWA_ELIGIBLE[2];
        break;
      case 'X':
        selected = ICWA_ELIGIBLE[3];
        break;
      default:
        selected = [];
    }
    return selected;
  };

  addEthnicity = () => {
    if (
      this.state.unableToDetermine ||
      this.state.childClient.primary_race === 'Declines to state*'
    ) {
      return (
        <Button
          btnClassName="default pull-right"
          btnName="+Add Ethnicities"
          onClick={this.onClick}
          disabled={true}
        />
      );
    } else {
      return (
        <Button
          btnClassName="default pull-right"
          btnName="+Add Ethnicities"
          onClick={this.onClick}
          disabled={false}
        />
      );
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <label>
            <h4 htmlFor="Race / Ethnicity">Race / Ethnicity</h4>
          </label>
        </div>
        <DropDownField
          id="dropdown2"
          gridClassName="col-md-6 col-sm-6 col-xs-12"
          selectedOption={this.state.childClient.primary_race}
          options={RACE}
          label="Select Primary Race/Ethnicity"
          onChange={this.handlePrimaryRace('primary_race')}
        />
        {this.addEthnicity()}
        {this.state.unableToDetermine && (
          <div>
            <DropDownField
              id="dropdown3"
              gridClassName="col-md-12 col-sm-6 col-xs-12"
              selectedOption={this.state.childClient.unableToDetermineReason}
              options={UNABLE_TO_DETERMINE_REASON}
              label="Unable to Determine Reason - Required"
              onChange={this.handleUnableToDetermine('unableToDetermineReason')}
            />
          </div>
        )}
        {this.state.addOtherEthnicity &&
          !this.state.unableToDetermine &&
          this.state.childClient.primary_race !== 'Declines to state*' && (
            <div>
              <MultiSelect
                id="dropdown5"
                gridClassName="col-md-12 col-sm-6 col-xs-12"
                selectedOption={this.state.childClient.other_ethnicity}
                options={OTHER_ETHNICITY}
                label="Other Ethnicity"
                onChange={this.handleOtherEthnicity('other_ethnicity')}
              />
              <Button
                btnClassName="default pull-right"
                btnName="SAVE"
                onClick={this.onClick}
              />
            </div>
          )}
        <div className="col-md-12">{this.raceAndEthnicity()}</div>
        <div className="form-group">
          <div className="col-md-6">
            <label htmlFor="Hispanic / Latino">Hispanic / Latino</label>
            <CheckboxRadioGroup
              id="checkbox1"
              name={'Hispanic'}
              type={'radio'}
              handleOnChange={this.handleChange}
              options={HISPANIC}
              selectedOptions={[this.state.hispanic]}
            />
            <div className="row">
              <DropDownField
                id="dropdown5"
                gridClassName="col-md-12 col-sm-6 col-xs-12"
                selectedOption={String(this.state.childClient)}
                options={UNABLE_TO_DETERMINE_REASON}
                label="Reason-Unable to Determine"
                onChange={this.handleDropdownChange('unableToDetermineReason')}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="ICWA Eligible">ICWA Eligible</label>
            <CheckboxRadioGroup
              id="checkbox2"
              name={'ICWA'}
              type={'radio'}
              handleOnChange={this.handleChange}
              options={ICWA_ELIGIBLE}
              selectedOptions={[this.state.selected]}
            />
          </div>
        </div>
      </div>
    );
  }
}

RaceAndEthnicity.propTypes = {
  childClient: PropTypes.object,
  anchorId: PropTypes.string,
};
RaceAndEthnicity.defaultProps = {
  childClient: {},
};

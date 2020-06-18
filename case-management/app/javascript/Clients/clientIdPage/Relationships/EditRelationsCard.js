import React from 'react';
import CheckBoxRadio from '../../../_components/CheckBoxRadio';
import DropDownField from 'react-wood-duck/dist/DropDownField';
import DateTimePicker from 'react-wood-duck/dist/DateTimePicker';
import PropTypes from 'prop-types';
import {
  toSecondaryRelationship,
  toPrimaryRelationship,
  formatClient,
} from '../../../_utils/formatters/formatters';
import { RELATIONSHIP_TYPES } from '../Constants';
import relationshipDropdown from './_components/relationship_dropdown/relationshipDropdown';

const propTypes = {
  client: PropTypes.object.isRequired,
  relationship: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
};
const defaultProps = {
  client: {},
  relationship: {},
};

class EditRelationsCard extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      client: { ...props.client },
      relationship: { ...props.relationship },
    };
  }

  handleAbsentParent = () => {
    const { relationship } = this.state;
    let update = {
      ...relationship,
      absent_parent_indicator: !relationship.absent_parent_indicator,
    };

    this.updateState(update);
  };

  handleDropdownChange = name => ({ value }) => {
    const { relationship } = this.state;
    const relationshipType = this.getRelationshipType(relationship.type_code);
    let updateRelationship = { ...relationship, [name]: value };

    if (this.toggleAbsentParent(relationshipType)) {
      updateRelationship = {
        ...updateRelationship,
        absent_parent_indicator: false,
      };
    }

    this.updateState(updateRelationship);
  };

  handleSameHomeStatus = () => {
    const { relationship } = this.state;
    const status = relationship.same_home_status === 'NO' ? 'YES' : 'NO';
    let update = {
      ...relationship,
      same_home_status: status,
    };

    this.updateState(update);
  };

  getRelationshipType = typeCode => {
    return RELATIONSHIP_TYPES.find(word => word.value === typeCode);
  };

  toggleAbsentParent = type => {
    const secondary = type ? toSecondaryRelationship(type.label) : '';

    return !secondary.toLowerCase().match(/\bfather\b|\bmother\b|\bparent\b/);
  };

  updateState = update => {
    this.setState({ relationship: update });
    this.props.update(update);
  };

  render() {
    const { client, relationship } = this.state;
    const relationshipType = this.getRelationshipType(relationship.type_code);
    const primaryClient = formatClient(client);
    const secondaryClient = formatClient(relationship.related_client);
    const primaryRelationship = toPrimaryRelationship(relationshipType.label);
    const secondaryRelationship = toSecondaryRelationship(
      relationshipType.label
    );
    const toggleDisable = this.toggleAbsentParent(relationshipType);
    const relationshipTypeList = relationshipDropdown(
      primaryClient,
      secondaryClient
    );

    return (
      <div>
        <div className="row">
          <div className="PrimaryPerson col-md-3">
            Primary Person
            <div className="Details">
              <p>
                <b>{primaryClient.name}</b>
              </p>
              <p>Age: {primaryClient.age} Years</p>
              <p> Gender: {primaryClient.gender_code} </p>
            </div>
          </div>

          <div className="DropDown col-md-6">
            <DropDownField
              name="Relationship Types"
              label=" Primary Person Relationship / Related Person*"
              options={relationshipTypeList}
              selectedOption={relationshipType.value.toString()}
              onChange={this.handleDropdownChange('type_code')}
            />
          </div>

          <div className="RelatedClient col-md-3">
            Related Person
            <div className="Details">
              <p>
                <b>{secondaryClient.name}</b>
              </p>
              <p> Age : {secondaryClient.age} Years</p>
              <p> Gender: {secondaryClient.gender_code} </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="Description col-md-12">
            <b>{primaryClient.name} </b>
            is the {primaryRelationship} of {secondaryRelationship}
            <b> {secondaryClient.name}</b>
          </div>
        </div>
        <div className="row">
          <div className="Checkboxes form-group col-md-12">
            <div className="col-md-6">
              <CheckBoxRadio
                label="Live At Same Location"
                type="checkbox"
                id="same_home_status"
                checked={relationship.same_home_status === 'YES'}
                onChange={this.handleSameHomeStatus}
              />
            </div>

            <div className="col-md-6">
              <CheckBoxRadio
                type="checkbox"
                label="Parents Whereabouts Unknown"
                id="absent_parent_indicator"
                checked={relationship.absent_parent_indicator}
                onChange={this.handleAbsentParent}
                disabled={toggleDisable}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="StartEndDates col-md-4 ">
            <label htmlFor="START DATE">START DATE</label>
            <DateTimePicker />
          </div>
          <div className="col-md-4 ">
            <label htmlFor="END DATE">END DATE</label>
            <DateTimePicker />
          </div>
        </div>
      </div>
    );
  }
}

EditRelationsCard.propTypes = propTypes;
EditRelationsCard.defaultProps = defaultProps;

export default EditRelationsCard;

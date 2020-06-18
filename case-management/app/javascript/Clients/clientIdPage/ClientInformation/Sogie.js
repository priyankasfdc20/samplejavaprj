import React from 'react';
import { DropDownField, TextArea } from 'react-wood-duck';
import {
  SOGIE_REASONS_UNABLE,
  SEXUAL_ORIENTATION,
  GENDER_IDENTITY,
  GENDER_EXPRESSION,
} from '../Constants';

export default class Sogie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAlert: false,
      descriptionFlag: false,
      value: '',
      childClient: {
        sexual_orientation: '',
        gender_indentity: '',
        unable_reason: '',
        sexual_description: '',
        gender_identity_description: '',
        gender_expression: '',
      },
    };
  }

  handleOnChange = name => ({ value }) => {
    const { childClient } = this.state;
    this.setState({
      childClient: { ...childClient, [name]: value },
    });
    if (value !== 'Not Listed') {
      this.setState({
        descriptionFlag: false,
        openAlert: true,
      });
    } else {
      this.setState({
        descriptionFlag: true,
      });
    }
  };

  alertProceed = () => {
    this.setState({
      openAlert: false,
      descriptionFlag: false,
    });
  };

  alertCancel = () => {
    this.setState({
      descriptionFlag: false,
      openAlert: false,
      childClient: { childClient: this.state.childClient },
    });
  };

  alert = () => {
    return (
      <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.alertCancel}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Alert</h4>
            </div>
            <div className="modal-body">
              <p>
                Changing option from ‘Not Listed’ will clear the previously
                entered data in the Description field. Do you want to proceed?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default btn-sm"
                data-dismiss="modal"
                onClick={this.alertCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={this.alertProceed}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* eslint-disable camelcase */

  render() {
    const {
      sexual_orientation,
      gender_indentity,
      unable_reason,
      sexual_description,
      gender_identity_description,
      gender_expression,
    } = this.state.childClient;
    return (
      <div className="row">
        <div className="form-group">
          <div className="col-md-12">
            <label>
              <h4 htmlFor="SOGIE">SOGIE</h4>
            </label>
          </div>
          <div className="col-md-4">
            <DropDownField
              options={SEXUAL_ORIENTATION}
              label="Sexual Orientation (required)"
              selectedOption={sexual_orientation}
              onChange={this.handleOnChange('sexual_orientation')}
            />
          </div>
          {this.state.openAlert && this.alert()}
          {this.state.descriptionFlag && (
            <div className="col-md-12">
              <TextArea
                name="Description"
                rows={10}
                label="Sexual Description(required)"
                value={sexual_description}
                handleOnChange={this.handleOnChange('sexual_description')}
              />
            </div>
          )}
          {sexual_orientation ===
            'Unable to Determine- (if chosen must choose from the following sub-options)' && (
            <div className="col-md-8">
              <DropDownField
                options={SOGIE_REASONS_UNABLE}
                label="Reason unable to determine (required)"
                selectedOption={unable_reason}
                onChange={this.handleOnChange('unable_reason')}
              />
            </div>
          )}
          <div className="col-md-12">
            <DropDownField
              options={GENDER_IDENTITY}
              label="Gender Identity"
              selectedOption={gender_indentity}
              onChange={this.handleOnChange('gender_indentity')}
            />
          </div>
          {this.state.descriptionFlag && (
            <div className="col-md-12">
              <TextArea
                name="Description"
                rows={10}
                label="Gender Identity Description(required)"
                value={gender_identity_description}
                handleOnChange={this.handleOnChange(
                  'gender_identity_description'
                )}
              />
            </div>
          )}
          <div className="col-md-12">
            <DropDownField
              options={GENDER_EXPRESSION}
              label="Gender Expression"
              selectedOption={gender_expression}
              onChange={this.handleOnChange('gender_expression')}
            />
          </div>
        </div>
      </div>
    );
  }
}

/* eslint-enable camelcase */

Sogie.propTypes = {};
Sogie.defaultProps = {};

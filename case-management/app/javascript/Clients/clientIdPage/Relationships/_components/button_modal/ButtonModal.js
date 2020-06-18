import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ButtonToolbar } from 'react-bootstrap';
import EditRelationsCard from '../../EditRelationsCard';
import { Button } from 'react-wood-duck';

const propTypes = {
  client: PropTypes.object,
  relationship: PropTypes.object,
  updateRelation: PropTypes.func,
};
class ButtonModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      client: { ...props.client },
      relationship: { ...props.relationship },
      showModalSave: false,
      showModalConfirm: false,
      status: 'idle',
      disabled: true,
    };
    this.baseState = this.state;
  }
  cancelEdit = () => {
    this.setState(this.baseState);
    this.setState({ showModalSave: false });
  };

  handleShowModalSave = () => this.setState({ showModalSave: true });

  handleShowModalConfirm = () => this.setState({ showModalConfirm: true });

  handleHideModalConfirm = () => this.setState({ showModalConfirm: false });

  update = relationship =>
    this.setState({ relationship: relationship, disabled: false });

  save = () => this.handleShowModalConfirm();

  saveConfirm = () => {
    const { relationship } = this.state;

    this.handleHideModalConfirm();
    this.cancelEdit();
    this.props.updateRelation(relationship);
  };

  saveModal = () => {
    return (
      <Modal
        show={this.state.showModalSave}
        onHide={this.cancelEdit}
        dialogClassName="modalWidth"
        bsSize="large"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            Edit Existing Relationship
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditRelationsCard {...this.props} update={this.update} />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default" onClick={this.cancelEdit}>
            Cancel
          </button>
          <Button
            btnClassName="primary"
            btnName="Save Relationship"
            onClick={this.save}
            disabled={this.state.disabled}
          />
        </Modal.Footer>
      </Modal>
    );
  };

  confirmModal = () => {
    return (
      <Modal
        show={this.state.showModalConfirm}
        onHide={this.handleHideModalConfirm}
        dialogClassName="modalConfirmWidth"
        bsSize="small"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-titleConfirm-lg">
            Please confirm!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to save?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default" onClick={this.cancelEdit}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={this.saveConfirm}>
            Yes Save Relationship
          </button>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    return (
      <ButtonToolbar>
        <button
          className="actions"
          onClick={() => {
            this.handleShowModalSave();
          }}
        >
          Actions
        </button>
        {this.saveModal()}
        {this.confirmModal()}
      </ButtonToolbar>
    );
  }
}

ButtonModal.propTypes = propTypes;

export default ButtonModal;

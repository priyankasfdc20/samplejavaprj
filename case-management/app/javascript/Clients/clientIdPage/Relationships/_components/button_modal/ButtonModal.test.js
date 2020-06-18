import React from 'react';
import { shallow } from 'enzyme';
import ButtonModal from '../button_modal';

describe('<ButtonModal />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ButtonModal relationship={{ type_code: 211 }} />);
  });

  it('simulate a click on button and show modal', () => {
    component.find('.actions').simulate('click');
    expect(component.instance().state.showModalSave).toBe(true);
  });

  it('renders ButtonModal Component', () => {
    expect(component.find('EditRelationsCard').length).toEqual(1);
  });

  describe('#handleShowModalSave', () => {
    it('toggles the Save Modal to show', () => {
      component.instance().handleShowModalSave();
      expect(component.instance().state.showModalSave).toEqual(true);
    });
  });

  describe('#cancelEdit', () => {
    it('toggles the Save Modal to hide', () => {
      component.instance().cancelEdit();
      expect(component.instance().state.showModalSave).toEqual(false);
    });
  });

  describe('#handleShowModalConfirm', () => {
    it('toggles the Confirm Modal to show', () => {
      component.instance().handleShowModalConfirm();
      expect(component.instance().state.showModalConfirm).toEqual(true);
    });
  });

  describe('#handleHideModalConfirm', () => {
    it('toggles the Confirm Modal to hide', () => {
      component.instance().handleHideModalConfirm();
      expect(component.instance().state.showModalConfirm).toEqual(false);
    });
  });

  describe('#update', () => {
    it('updates the relationship state', () => {
      component.instance().update({ id: 'hello' });
      expect(component.instance().state.relationship).toEqual({ id: 'hello' });
    });
  });

  describe('#save', () => {
    it('save toggles the Confirm Modal to show', () => {
      component.instance().save();
      expect(component.instance().state.showModalConfirm).toEqual(true);
    });
  });

  describe('#saveConfirm', () => {
    it('toggles the Confirm Modal and Modal Save to hide', () => {
      component = shallow(
        <ButtonModal
          relationship={{ type_code: 211 }}
          updateRelation={() => {}}
        />
      );
      component.instance().saveConfirm();
      expect(component.instance().state.showModalConfirm).toEqual(false);
      expect(component.instance().state.showModalSave).toEqual(false);
    });
  });

  describe('Enable or disable the Saverelationships button', () => {
    it('should return enabled Button', () => {
      component = shallow(
        <ButtonModal
          relationship={{ same_home_status: false }}
          updateRelation={() => {}}
        />
      );
      expect(component.find('Button').prop('disabled')).toEqual(true);
      component.instance().update({
        same_home_status: true,
      });
      component.update();
      expect(component.find('Button').prop('disabled')).toEqual(false);
    });
  });
});

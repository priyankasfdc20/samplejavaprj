import React from 'react';
import { shallow } from 'enzyme';
import Sogie from './Sogie';

describe('Sogie', () => {
  let sogie;

  beforeEach(() => {
    sogie = shallow(<Sogie />);
  });

  describe('#render', () => {
    describe('when sexualOrientation is Unable to be determined', () => {
      it('adds a DropDownField', () => {
        sogie.setState({
          childClient: {
            sexual_orientation:
              'Unable to Determine- (if chosen must choose from the following sub-options)',
          },
        });
        expect(
          sogie.find('[label="Reason unable to determine (required)"]').exists()
        ).toBe(true);
      });
    });

    describe('when descriptionFlag is true', () => {
      it('adds a TextArea', () => {
        sogie.setState({
          descriptionFlag: true,
        });
        expect(
          sogie.find('[label="Sexual Description(required)"]').exists()
        ).toBe(true);
        expect(
          sogie.find('[label="Gender Identity Description(required)"]').exists()
        ).toBe(true);
      });
    });
  });

  describe('#handleOnChange()', () => {
    it('should handle the event that sets state if value is Not Listed', () => {
      const instance = sogie.instance();
      const myFunction = instance.handleOnChange('sexual_orientation');
      expect(() => myFunction({ value: 'Not Listed' })).not.toThrow();
      expect(instance.state.childClient.sexual_orientation).toEqual(
        'Not Listed'
      );
      expect(instance.state.openAlert).toBe(false);
    });

    it('should handle the event that sets state', () => {
      const instance = sogie.instance();
      const myFunction = instance.handleOnChange('sexual_orientation');
      expect(() => myFunction({ value: 'Something' })).not.toThrow();
      expect(instance.state.childClient.sexual_orientation).toEqual(
        'Something'
      );
      expect(instance.state.openAlert).toBe(true);
    });
  });

  describe('#alertProceed', () => {
    it('should handle the Proceed event and sets state', () => {
      const instance = sogie.instance();
      instance.alertProceed();
      expect(instance.state.openAlert).toBe(false);
      expect(instance.state.descriptionFlag).toBe(false);
    });
  });

  describe('#alertCancel', () => {
    it('should handle the Cancel event and sets state', () => {
      const instance = sogie.instance();
      instance.alertCancel();
      expect(instance.state.openAlert).toBe(false);
      expect(instance.state.descriptionFlag).toBe(false);
    });
  });
});

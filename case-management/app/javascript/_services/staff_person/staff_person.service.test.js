import StaffPersonService from './staff_person.service';

jest.mock('../api');
const ApiService = require('../api').default;

describe('StaffPersonService', () => {
  describe('#fetchCurrent', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'get');
    });

    it('calls ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve(42));
      expect(getSpy).not.toHaveBeenCalled();
      StaffPersonService.fetchCurrent();
      expect(getSpy).toHaveBeenCalledWith('/staff_persons/current');
    });
  });
});

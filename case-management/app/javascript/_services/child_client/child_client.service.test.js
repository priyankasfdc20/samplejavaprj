import ChildClientService from './child_client.service';

jest.mock('../api');
const ApiService = require('../api').default;

const id = 'FeLX5t8aah';

describe('ChildClientService', () => {
  it('exists', () => {
    expect(!!ChildClientService).toBeTruthy();
  });

  describe('#fetch', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'get');
    });

    it('calls fetch ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}));
      expect(getSpy).not.toHaveBeenCalled();
      ChildClientService.fetch(id);
      expect(getSpy).toHaveBeenCalledWith(`/child_clients/${id}`);
    });

    it('calls csec from ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}));
      ChildClientService.csec(id);
      expect(getSpy).toHaveBeenCalledWith(`/child_clients/${id}/csec`);
    });

    it('calls indianAncestry from ApiService', () => {
      const id = 'AazXkWY06s';
      getSpy.mockReturnValue(Promise.resolve({}));
      ChildClientService.indianAncestry(id);
      expect(getSpy).toHaveBeenCalledWith(
        `/child_clients/${id}/indian_ancestry_notifications`
      );
    });
  });
});

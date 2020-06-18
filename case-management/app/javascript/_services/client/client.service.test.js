import ClientService from './client.service';

jest.mock('../api');
const ApiService = require('../api').default;
const clientId = 'R06FKZ20X5';

describe('ClientService', () => {
  it('exists', () => {
    expect(!!ClientService).toBeTruthy();
  });

  describe('#fetch', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'get');
    });

    afterEach(() => {
      getSpy.mockReset();
      getSpy.mockClear();
    });

    it('calls ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve(42));
      expect(getSpy).not.toHaveBeenCalled();
      ClientService.fetch(clientId);
      expect(getSpy).toHaveBeenCalledWith(`/clients/${clientId}`);
    });

    it('calls safety-alert from ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}));
      ClientService.fetchSafetyAlerts(clientId);
      expect(getSpy).toHaveBeenCalledWith(`/clients/${clientId}/safety_alerts`);
    });
  });

  // NOTE: commented out because linter fails on xOperations.
  //       This implementation can be used after #204 is merged
  // describe('getRelatedClientsByChildClientId()', () => {
  //   let getSpy;

  //   beforeEach(() => {
  //     getSpy = jest.spyOn(ApiService, 'get');
  //   });

  //   afterEach(() => {
  //     getSpy.mockReset();
  //     getSpy.mockClear();
  //   });

  //   it('formats a request to the service', () => {
  //     getSpy.mockReturnValue(Promise.resolve({ data: [] }));
  //     expect(getSpy).not.toHaveBeenCalled();
  //     ClientService.getRelatedClientsByChildClientId('1234');
  //     expect(getSpy).toHaveBeenCalledWith('/placement/1234/relatedClients');
  //   });
  // });
});

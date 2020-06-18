import { FeatureService } from './feature.service';

jest.mock('../api');
const ApiService = require('../api').default;

describe('FeatureService', () => {
  describe('#fetch', () => {
    const apiGetSpy = jest.spyOn(ApiService, 'get');

    beforeEach(() => {
      apiGetSpy.mockReset();
    });

    it('returns features', async () => {
      const expectedFeatures = { dashboard_case_actions: true };
      apiGetSpy.mockReturnValue(Promise.resolve({ data: expectedFeatures }));
      const actualFeatures = await FeatureService.fetch();
      expect(actualFeatures).toBe(expectedFeatures);
      expect(apiGetSpy).toHaveBeenCalledTimes(1);
      expect(apiGetSpy).toHaveBeenCalledWith('/features');
    });
  });
});

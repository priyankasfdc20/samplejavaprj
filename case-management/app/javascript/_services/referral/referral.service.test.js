import ReferralService from './referral.service';

jest.mock('../api');
const ApiService = require('../api').default;

jest.mock('./transforms', () => ({
  replaceResponseType: jest.fn(d => d),
  joinReceiveDateTime: jest.fn(d => d),
}));
const joinReceiveDateTime = require('./transforms').joinReceiveDateTime;

describe('ReferralService', () => {
  it('exists', () => {
    expect(!!ReferralService).toBeTruthy();
  });

  describe('#fetch', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'get');
    });

    afterEach(() => {
      getSpy.mockReset();
      getSpy.mockRestore();
    });

    it('calls ApiService', done => {
      getSpy.mockReturnValue(Promise.resolve(42));
      expect(getSpy).not.toHaveBeenCalled();
      ReferralService.fetch()
        .then(_ => done())
        .catch(_ => done());
      expect(getSpy).toHaveBeenCalledWith(jasmine.any(String));
    });

    it('applies transformations', done => {
      const referral = {};
      getSpy.mockReturnValue(Promise.resolve({ data: [referral] }));
      expect(joinReceiveDateTime).not.toHaveBeenCalled();
      ReferralService.fetch()
        .then(res => {
          expect(joinReceiveDateTime).toHaveBeenCalledWith(referral);
          done();
        })
        .catch(d => done(d));
    });
  });
});

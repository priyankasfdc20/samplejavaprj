import RelationshipService from './relationship.service';

jest.mock('../api');
const ApiService = require('../api').default;

describe('RelationshipService', () => {
  it('exists', () => {
    expect(!!RelationshipService).toBeTruthy();
  });

  describe('#fetch', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'get');
    });

    it('calls ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve(42));
      expect(getSpy).not.toHaveBeenCalled();
      RelationshipService.fetch();
      expect(getSpy).toHaveBeenCalledWith(jasmine.any(String));
    });
  });

  describe('#update', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'put');
    });

    it('calls ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve(42));
      expect(getSpy).not.toHaveBeenCalled();
      RelationshipService.update('Foo', 'Bar', 'Update');
      expect(getSpy).toHaveBeenCalledWith(
        '/clients/Foo/relationships/Bar',
        'Update'
      );
    });
  });
});

import Clients from '../../_services/client';
import fetchRelatedClientsSaga, {
  fetchRelatedClients,
} from './fetchRelatedClientsSaga';
import * as actionTypes from '../constants/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

describe('#fetchRelatedClientsSaga', () => {
  it('starts fetch saga', () => {
    const gen = fetchRelatedClientsSaga();

    expect(gen.next().value).toEqual(
      takeLatest(
        actionTypes.FETCH_RELATED_CLIENTS_API_CALL_REQUEST,
        fetchRelatedClients
      )
    );
  });

  describe('#fetchRelatedClients', () => {
    const clientId = 'DZGcEEgaa1';
    beforeEach(() => (Clients.getRelatedClientsByChildClientId = jest.fn()));

    it('should fetches the related clients', () => {
      const gen = fetchRelatedClients();

      expect(gen.next().value).toEqual(
        call(Clients.getRelatedClientsByChildClientId, clientId)
      );
      expect(gen.next([{ id: '42' }, { id: '43' }]).value).toEqual(
        put({
          type: actionTypes.FETCH_RELATED_CLIENTS_API_CALL_SUCCESS,
          relatedClients: [{ id: '42' }, { id: '43' }],
        })
      );
      expect(gen.next().done).toBe(true);
    });

    it('should throw an error', () => {
      Clients.getRelatedClientsByChildClientId = jest.fn();
      const gen = fetchRelatedClients();

      expect(gen.next().value).toEqual(
        call(Clients.getRelatedClientsByChildClientId, clientId)
      );
      expect(gen.throw('Error').value).toEqual(
        put({
          type: actionTypes.FETCH_RELATED_CLIENTS_API_CALL_FAILURE,
          error: 'Error',
        })
      );
      expect(gen.next().done).toBe(true);
    });
  });
});

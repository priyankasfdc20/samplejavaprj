import React from 'react';
import { shallow, mount } from 'enzyme';
import { ClientIdPage } from './ClientIdPage.js';
import ClientService from '../../_services/client';
import ChildClientService from '../../_services/child_client';
import RelationshipService from '../../_services/relationship';

describe('Client ID Page', () => {
  const pageTitle = 'Child Name';
  let clientPage;
  let store;
  beforeEach(() => {
    store = jest.fn();
    clientPage = shallow(<ClientIdPage store={store} />);
  });

  describe('#getAlertMessages', () => {
    const alerts = [
      {
        activation_date: '1-4-2002',
        activation_reason_code: 'Heat',
      },
      {
        activation_date: '4-5-2003',
        activation_reason_code: 'cool',
      },
    ];
    const wrapper = shallow(<ClientIdPage safetyAlerts={alerts} />);
    it('renders the array of list of reasons', () => {
      expect(wrapper.find('li').length).toEqual(2);
    });

    it('renders an empty list when no alerts', () => {
      const noAlerts = [];
      const wrapper = shallow(<ClientIdPage safetyAlerts={noAlerts} />);
      expect(wrapper.find('li').length).toEqual(0);
    });
  });

  describe('#handleSelect', () => {
    it('stops propagation', () => {
      const event = { stopPropagation: () => {} };
      jest.spyOn(event, 'stopPropagation');
      const wrapper = mount(<ClientIdPage />).instance();
      wrapper.handleSelect('_href', event);
      expect(event.stopPropagation).toHaveBeenCalledWith();
    });
  });

  it('Has Global Header ', () => {
    expect(clientPage.find('Header').length).toBe(1);
  });

  it('Has Page Header ', () => {
    expect(clientPage.find('PageHeader').length).toBe(1);
  });

  it('Has Safety Alert Information', () => {
    expect(clientPage.find('SafetyAlertInformation').length).toBe(1);
  });

  it('Has Class Names ', () => {
    expect(
      clientPage
        .find('PageHeader')
        .at(0)
        .props().pageTitle
    ).toBe(pageTitle);
    expect(
      clientPage
        .find('div')
        .at(1)
        .props().className
    ).toBe('container');
    expect(
      clientPage
        .find('div')
        .at(2)
        .props().className
    ).toBe('row');
    expect(
      clientPage
        .find('div')
        .at(3)
        .props().className
    ).toBe('col-sm-3');
    expect(
      clientPage
        .find('div')
        .at(4)
        .props().className
    ).toBe('col-sm-9');
  });

  describe('#fetchChildClient', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ChildClientService, 'fetch');
      ChildClientService.fetch.mockReturnValue(Promise.resolve([]));
    });

    afterEach(() => getSpy.mockRestore());

    it('calls the ChildClientService.fetch', () => {
      const instance = clientPage.instance();
      expect(ChildClientService.fetch).toHaveBeenCalledTimes(0);
      instance.fetchChildClient();
      expect(ChildClientService.fetch).toHaveBeenCalledTimes(1);
    });

    it('updates the data resolved', () => {
      const instance = clientPage.instance();
      const client = { identifier: '42' };
      const promise = Promise.resolve(client);

      getSpy.mockReturnValueOnce(promise);
      return instance.fetchChildClient().then(() => {
        expect(clientPage.update().state('childClient').XHRStatus).toEqual(
          'ready'
        );
        expect(clientPage.update().state('childClient').information).toEqual(
          client
        );
      });
    });

    it('should handle the error', () => {
      const instance = shallow(<ClientIdPage />).instance();
      getSpy.mockReturnValue(Promise.reject(Error('error')));
      return instance.fetchChildClient().then(childClient => {
        expect(instance.state.childClient.XHRStatus).toBe('error');
      });
    });
  });

  describe('#setCsecData', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ChildClientService, 'csec');
      ChildClientService.csec.mockReturnValue(Promise.resolve([]));
    });

    afterEach(() => getSpy.mockRestore());

    it('calls the ChildClientService.csec', () => {
      const instance = clientPage.instance();
      expect(ChildClientService.csec).toHaveBeenCalledTimes(0);
      instance.setCsecData();
      expect(ChildClientService.csec).toHaveBeenCalledTimes(1);
    });

    it('updates the data resolve', () => {
      const instance = clientPage.instance();
      const csec = { identifier: '42' };
      const promise = Promise.resolve(csec);

      getSpy.mockReturnValueOnce(promise);
      return instance.setCsecData().then(() => {
        expect(clientPage.update().state('csecResponse').XHRStatus).toEqual(
          'ready'
        );
        expect(clientPage.update().state('csecResponse').records).toEqual(csec);
      });
    });

    it('should handle the error', () => {
      const instance = shallow(<ClientIdPage />).instance();
      getSpy.mockReturnValue(Promise.reject(Error('error')));
      return instance.setCsecData().then(csec => {
        expect(instance.state.csecResponse.XHRStatus).toBe('error');
      });
    });
  });

  describe('#fetchIndianAncestryData', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ChildClientService, 'indianAncestry');
      ChildClientService.indianAncestry.mockReturnValue(Promise.resolve([]));
    });

    afterEach(() => getSpy.mockRestore());

    it('calls the ChildClientService.fetch', () => {
      const instance = clientPage.instance();
      expect(ChildClientService.indianAncestry).toHaveBeenCalledTimes(0);
      instance.fetchIndianAncestryData();
      expect(ChildClientService.indianAncestry).toHaveBeenCalledTimes(1);
    });

    it('updates the data resolve', () => {
      const instance = clientPage.instance();
      const indianAncestry = { identifier: '42' };
      const promise = Promise.resolve(indianAncestry);

      getSpy.mockReturnValueOnce(promise);
      return instance.fetchIndianAncestryData().then(() => {
        expect(clientPage.update().state('indianAncestry').XHRStatus).toEqual(
          'ready'
        );
        expect(clientPage.update().state('indianAncestry').records).toEqual(
          indianAncestry
        );
      });
    });

    it('should handle the error', () => {
      const instance = shallow(<ClientIdPage />).instance();

      getSpy.mockReturnValue(Promise.reject(Error('error')));
      return instance.fetchIndianAncestryData().then(indianAncestry => {
        expect(instance.state.indianAncestry.XHRStatus).toBe('error');
      });
    });
  });

  describe('#fetchRelatedClients', () => {
    let getSpy;
    beforeEach(() => {
      getSpy = jest.spyOn(ClientService, 'getRelatedClientsByChildClientId');
      ClientService.getRelatedClientsByChildClientId.mockReturnValue(
        Promise.resolve([])
      );
    });

    afterEach(() => getSpy.mockRestore());

    it('calls the ClientService', () => {
      const instance = clientPage.instance();
      expect(
        ClientService.getRelatedClientsByChildClientId
      ).toHaveBeenCalledTimes(0);
      instance.fetchRelatedClients();
      expect(
        ClientService.getRelatedClientsByChildClientId
      ).toHaveBeenCalledTimes(1);
    });

    it('filters the clientId', () => {
      const instance = clientPage.instance();
      const relatedClients = [
        { identifier: 'DZGcEEgaa1' },
        { identifier: '1' },
      ];
      const expectedRelatedClient = [{ identifier: '1' }];
      const promise = Promise.resolve(relatedClients);

      getSpy.mockReturnValueOnce(promise);
      return instance.fetchRelatedClients().then(() => {
        expect(clientPage.update().state('relatedClients').XHRStatus).toEqual(
          'ready'
        );
        expect(clientPage.update().state('relatedClients').records).toEqual(
          expectedRelatedClient
        );
      });
    });

    it('updates the data resolve', () => {
      const instance = clientPage.instance();
      const relatedClient = [
        {
          common_first_name: 'hello',
          common_last_name: 'world',
          address: {
            street_name: 'foo',
            street_number: 'bar',
          },
          birth_dt: '1986-11-06',
          relationship_type: 'Aunt/Nephew (Maternal)',
        },
      ];
      const promise = Promise.resolve(relatedClient);

      getSpy.mockReturnValueOnce(promise);
      return instance.fetchRelatedClients().then(() => {
        expect(clientPage.update().state('relatedClients').XHRStatus).toEqual(
          'ready'
        );
        expect(clientPage.update().state('relatedClients').records).toEqual(
          relatedClient
        );
      });
    });

    it('should handle the error', () => {
      const instance = shallow(<ClientIdPage />).instance();

      getSpy.mockReturnValue(Promise.reject(Error('error')));
      return instance.fetchRelatedClients().then(clients => {
        expect(instance.state.relatedClients.XHRStatus).toBe('error');
      });
    });
  });

  describe('#fetchRelation', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(RelationshipService, 'fetch');
      RelationshipService.fetch.mockReturnValue(Promise.resolve([]));
    });

    afterEach(() => getSpy.mockRestore());

    it('calls the RelationshipService', () => {
      expect(getSpy).toHaveBeenCalledTimes(0);
      clientPage.instance().fetchRelation();
      expect(getSpy).toHaveBeenCalledTimes(1);
    });

    it('updates the data resolve', () => {
      const data = [{ identifier: 'Foo' }];

      getSpy.mockReturnValueOnce(Promise.resolve(data));
      return clientPage
        .instance()
        .fetchRelation()
        .then(() => {
          clientPage.update();
          expect(clientPage.state('relationships').XHRStatus).toEqual('ready');
          expect(clientPage.state('relationships').records).toEqual(data);
        });
    });

    it('should handle the error', () => {
      const instance = shallow(<ClientIdPage />).instance();

      getSpy.mockReturnValue(Promise.reject(Error('error')));
      return instance.fetchRelation().then(relationships => {
        expect(instance.state.relationships.XHRStatus).toBe('error');
      });
    });
  });

  describe('#updateRelation', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(RelationshipService, 'update');
      RelationshipService.update.mockReturnValue(Promise.resolve([]));
    });

    afterEach(() => getSpy.mockRestore());

    it('calls the RelationshipService update', () => {
      const data = { client_id: 'Foo', id: 'bar' };

      expect(getSpy).toHaveBeenCalledTimes(0);
      clientPage.instance().updateRelation(data);
      expect(getSpy).toHaveBeenCalledWith('Foo', 'bar', data);
      expect(getSpy).toHaveBeenCalledTimes(1);
    });

    it('filters the id that is updated then merge an array from the response', () => {
      const params = { client_id: 'Foo', id: '42' };
      const response = [
        {
          id: '42',
          related_client: {
            common_first_name: 'hello',
            common_last_name: 'world',
          },
        },
      ];
      const expectedData = [
        {
          id: '43',
          related_client: {
            common_first_name: 'darth',
            common_last_name: 'vader',
          },
        },
        {
          id: '42',
          related_client: {
            common_first_name: 'hello',
            common_last_name: 'world',
          },
        },
      ];

      clientPage.setState({
        relationships: {
          records: [
            {
              id: '42',
              related_client: {
                common_first_name: 'foo',
                common_last_name: 'bar',
              },
            },
            {
              id: '43',
              related_client: {
                common_first_name: 'darth',
                common_last_name: 'vader',
              },
            },
          ],
        },
      });

      getSpy.mockReturnValueOnce(Promise.resolve(response));
      return clientPage
        .instance()
        .updateRelation(params)
        .then(() => {
          clientPage.update();
          expect(clientPage.state('relationships').records).toEqual(
            expectedData
          );
          expect(clientPage.state('relationships').updatedRelationship).toEqual(
            'hello world'
          );
        });
    });

    it('receives a response and success of updating', () => {
      const params = { client_id: 'Foo', id: '43' };
      const data = [
        {
          id: '42',
          related_client: {
            common_first_name: 'hello',
            common_last_name: 'world',
          },
        },
      ];

      clientPage.setState({ relationships: { records: [] } });

      getSpy.mockReturnValueOnce(Promise.resolve(data));
      return clientPage
        .instance()
        .updateRelation(params)
        .then(() => {
          clientPage.update();
          expect(clientPage.state('relationships').XHRStatus).toEqual('ready');
          expect(clientPage.state('relationships').records).toEqual(data);
          expect(clientPage.state('relationships').updateStatus).toEqual(true);
        });
    });

    it('should handle the error', () => {
      const params = { client_id: 'Foo', id: '43' };
      const instance = shallow(<ClientIdPage />).instance();

      getSpy.mockReturnValue(Promise.reject(Error('error')));
      return instance.updateRelation(params).then(relationships => {
        expect(instance.state.relationships.XHRStatus).toBe('error');
      });
    });
  });

  describe('Alert success renders when updateRelation is successful', () => {
    it('renders when the updateStatus is true', () => {
      expect(clientPage.find('Alert').length).toBe(0);
      clientPage.setState({ relationships: { updateStatus: true } });
      expect(clientPage.find('Alert').length).toBe(1);
    });

    it('does not render when the updateStatus is false', () => {
      clientPage.setState({ relationships: { updateStatus: false } });
      expect(clientPage.find('Alert').length).toBe(0);
    });
  });
});

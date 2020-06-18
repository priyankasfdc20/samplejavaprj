import React from 'react';
import { mount, shallow } from 'enzyme';
import { ClientIdPage } from './ClientIdPage.js';
import ClientInformation from './ClientInformation/ClientInformation';
import CsecInformation from './ClientInformation/CsecInformation';
import IndianAncestry from './ClientInformation/IndianAncestry';
import OtherClientInformation from './ClientInformation/OtherClientInformation';
import RaceAndEthnicity from './ClientInformation/RaceAndEthnicity';
import RelationsCard from './Relationships/RelationsCard';

describe('<ClientIdPage />', () => {
  let clientIdPage;

  beforeEach(() => {
    const mockStore = jest.fn();
    clientIdPage = shallow(<ClientIdPage store={mockStore} />);
  });

  it('renders a <ClientInformation />', () => {
    clientIdPage.setState({
      childClient: {
        XHRStatus: 'ready',
        information: [{ identifier: '1' }, { identifier: '2' }],
      },
    });
    const client = mount(
      clientIdPage
        .instance()
        .renderClientInformation()
        .props.render()
    );
    expect(client.find('ClientInformation').type()).toBe(ClientInformation);
    expect(client.find('ClientInformation').prop('childClient').length).toBe(2);
  });

  it('renders a <RaceAndEthnicity />', () => {
    clientIdPage.setState({
      childClient: {
        XHRStatus: 'ready',
        information: [{ identifier: '1' }, { identifier: '2' }],
      },
    });
    const client = mount(
      clientIdPage
        .instance()
        .renderClientInformation()
        .props.render()
    );
    expect(client.find('RaceAndEthnicity').type()).toBe(RaceAndEthnicity);
    expect(client.find('RaceAndEthnicity').prop('childClient').length).toBe(2);
  });

  it('renders a <OtherClientInformation />', () => {
    clientIdPage.setState({
      childClient: {
        XHRStatus: 'ready',
        information: [{ identifier: '1' }, { identifier: '2' }],
      },
    });
    const client = mount(
      clientIdPage
        .instance()
        .renderClientInformation()
        .props.render()
    );
    expect(client.find('OtherClientInformation').type()).toBe(
      OtherClientInformation
    );
    expect(
      client.find('OtherClientInformation').prop('childClient').length
    ).toBe(2);
  });

  it('renders a <CsecInformation />', () => {
    clientIdPage.setState({
      childClient: {
        XHRStatus: 'ready',
        information: [{ identifier: '1' }, { identifier: '2' }],
      },
      csecResponse: {
        XHRStatus: 'ready',
        records: [
          { identifier: '1', primary_race: '' },
          { identifier: '2', primary_race: '' },
        ],
      },
    });
    const client = mount(
      clientIdPage
        .instance()
        .renderClientInformation()
        .props.render()
    );
    expect(client.find('CsecInformation').type()).toBe(CsecInformation);
    expect(client.find('CsecInformation').prop('csecResponse').length).toBe(2);
  });

  it('renders a <IndianAncestry />', () => {
    clientIdPage.setState({
      childClient: {
        XHRStatus: 'ready',
        information: [{ identifier: '1' }, { identifier: '2' }],
      },
      indianAncestry: {
        XHRStatus: 'ready',
        records: [{ identifier: '1' }, { identifier: '2' }],
      },
    });
    const client = mount(
      clientIdPage
        .instance()
        .renderClientInformation()
        .props.render()
    );
    expect(client.find('IndianAncestry').type()).toBe(IndianAncestry);
    expect(client.find('IndianAncestry').prop('indianAncestry').length).toBe(2);
  });

  it('renders a <RelationsCard />', () => {
    clientIdPage.setState({
      relatedClients: {
        XHRStatus: 'ready',
        records: [
          {
            common_first_name: 'hello',
            common_last_name: 'world',
            address: {
              street_name: 'foo',
              street_number: 'bar',
              city: 'sacramento',
              primary_phone: '808',
            },
            birth_dt: '1986-11-06',
            relationship_type: 'Aunt/Nephew (Maternal)',
          },
        ],
      },
      relationships: {
        XHRStatus: 'ready',
        records: [{ identifier: '1' }, { identifier: '2' }],
      },
    });
    const client = mount(
      clientIdPage
        .instance()
        .renderRelationships()
        .props.render()
    );
    expect(client.find('RelationsCard').type()).toBe(RelationsCard);
    expect(client.find('RelationsCard').prop('relatedClients').length).toBe(1);
  });
});

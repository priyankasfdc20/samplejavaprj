import React from 'react';
import { mount } from 'enzyme';
import CasesTable from './CasesTable';

jest.mock('../../_services/case');
const CaseService = require('../../_services/case').default;

describe('<CasesTable />', () => {
  it('is rendered with default header and status at first render', () => {
    CaseService.fetch.mockReturnValue(Promise.resolve([]));
    const wrapper = mount(<CasesTable staffId={'id'} />);
    expect(wrapper.find('.card-header').text()).toBe('Cases');
    expect(wrapper.find('.card-body').text()).toBe('waiting...');
  });

  describe('fetching cases', () => {
    it('is rendered when fetching failed', async () => {
      CaseService.fetch.mockReturnValue(Promise.reject(Error('error')));
      const wrapper = await mount(<CasesTable staffId={'id'} />);
      expect(wrapper.find('.card-header').text()).toBe('Cases');
    });

    it('displays empty message when empty array is fetched', async () => {
      CaseService.fetch.mockReturnValue(Promise.resolve([]));
      const wrapper = await mount(<CasesTable staffId={'id'} />);
      expect(wrapper.find('.card-header').text()).toBe('Cases (0)');
      expect(wrapper.find('.card-body').text()).toBe(
        'You currently do not have any cases assigned to you.'
      );
    });

    it('displays 2 records', async () => {
      CaseService.fetch.mockReturnValue(
        Promise.resolve([
          {
            identifier: '1XhE5CQaa1',
            case_name: 'Summers, B',
            client_identifier: '1EwZ6QAaa1',
            client_first_name: 'Buffy',
            client_last_name: 'Summers',
            active_service_component: 'Emergency Response',
            assignment_type: 'PRIMARY',
            assignment_start_date: '2018-03-02',
          },
          {
            identifier: 'B3tD9j4aa1',
            case_name: 'Gale, D',
            client_identifier: 'Al8YAwoaa1',
            client_first_name: 'Dorothy',
            client_last_name: 'Gale',
            active_service_component: 'Family Reunification',
            assignment_type: 'PRIMARY',
            assignment_start_date: '2018-03-04',
          },
        ])
      );
      const wrapper = await mount(<CasesTable staffId={'id'} />);
      wrapper.update();
      expect(wrapper.find('.card-header').text()).toBe('Cases (2)');
      const rows = wrapper.find('.react-bs-container-body tr');
      expect(rows.getElements().length).toBe(2);
      expect(rows.at(0).text()).toBe(
        'B3tD9j4aa1Gale, DFamily ReunificationPrimary3/4/2018'
      );
      expect(rows.at(1).text()).toBe(
        '1XhE5CQaa1Summers, BEmergency ResponsePrimary3/2/2018'
      );
    });
  });

  describe("'actions' column", () => {
    const actionsColumnSelector =
      'TableHeaderColumn[dataField="client_identifier"]';
    CaseService.fetch.mockReturnValue(
      Promise.resolve([
        {
          identifier: '1XhE5CQaa1',
        },
      ])
    );

    it('is shown when isActionsColumnShown = true', async () => {
      const wrapper = await mount(
        <CasesTable staffId={'id'} isActionsColumnShown={true} />
      );
      wrapper.update();
      expect(wrapper.find(actionsColumnSelector).exists()).toBe(true);
    });

    it('is hidden when isActionsColumnShown = false', async () => {
      const wrapper = await mount(
        <CasesTable staffId={'id'} isActionsColumnShown={false} />
      );
      wrapper.update();
      expect(wrapper.find(actionsColumnSelector).exists()).toBe(false);
    });
  });
});

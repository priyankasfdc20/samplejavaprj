import React from 'react';
import { mount } from 'enzyme';
import ReferralsTable from './ReferralsTable';

jest.mock('../../_services/referral');
const ReferralService = require('../../_services/referral').default;

describe('<ReferralsTable />', () => {
  it('is rendered with default header and status at first render', () => {
    ReferralService.fetch.mockReturnValue(Promise.resolve([]));
    const wrapper = mount(<ReferralsTable staffId={'id'} />);
    expect(wrapper.find('.card-header').text()).toBe('Referrals');
    expect(wrapper.find('.card-body').text()).toBe('waiting...');
  });

  describe('fetching referrals', () => {
    it('is rendered when fetching failed', async () => {
      ReferralService.fetch.mockReturnValue(Promise.reject(Error('error')));
      const wrapper = await mount(<ReferralsTable staffId={'id'} />);
      expect(wrapper.find('.card-header').text()).toBe('Referrals');
    });

    it('displays empty message when empty array is fetched', async () => {
      ReferralService.fetch.mockReturnValue(Promise.resolve([]));
      const wrapper = await mount(<ReferralsTable staffId={'id'} />);
      expect(wrapper.find('.card-header').text()).toBe('Referrals (0)');
      expect(wrapper.find('.card-body').text()).toBe(
        'You currently do not have any referrals assigned to you.'
      );
    });

    it('displays 2 records', async () => {
      ReferralService.fetch.mockReturnValue(
        Promise.resolve([
          {
            identifier: '1',
            referral_name: 'Name 1',
            referral_response_type: 'Immediate',
            assignment_type: 'Primary',
            received_datetime: '2010-12-31',
          },
          {
            identifier: '2',
            referral_name: 'Name 2',
            assignment_type: 'Secondary',
            received_datetime: '2020-01-13',
          },
        ])
      );
      const wrapper = await mount(<ReferralsTable staffId={'id'} />);
      wrapper.update();
      expect(wrapper.find('.card-header').text()).toBe('Referrals (2)');
      const rows = wrapper.find('.react-bs-container-body tr');
      expect(rows.getElements().length).toBe(2);
      expect(rows.at(0).text()).toBe(
        '1Name 1ImmediatePrimary12/31/2010 - 0:00 AM'
      );
      expect(rows.at(1).text()).toBe('2Name 2Secondary1/13/2020 - 0:00 AM');
    });
  });
});

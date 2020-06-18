import { selectAlertRecords } from './selectors';

describe('selectors', () => {
  describe('#selectAlertsRecords', () => {
    it('selects the alert records', () => {
      const state = {
        fetchSafetyAlerts: {
          safetyAlerts: {
            records: ['first', 'second', 'third'],
          },
        },
        other_stuff: { bad: 'ignore' },
      };

      expect(selectAlertRecords(state)).toEqual(['first', 'second', 'third']);
    });

    it('selects empty alerts safely', () => {
      const state = {
        fetchSafetyAlerts: {},
        other_stuff: { bad: 'ignore' },
      };
      expect(selectAlertRecords(state)).toBe(null);
    });

    it('selects no alerts node safely', () => {
      const state = {
        other_stuff: { bad: 'ignore' },
      };
      expect(selectAlertRecords(state)).toBe(null);
    });
  });
});

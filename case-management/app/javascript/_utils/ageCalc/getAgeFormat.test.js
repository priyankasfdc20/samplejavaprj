import { getAgeUtil, estimatedDoB } from './getAgeFormat';
import moment from 'moment';

describe('getAgeUtil()', () => {
  var currentDate = moment();
  describe('When the age is 1 year', () => {
    it('returns ageUnitSelection as y', () => {
      var pastYear = moment(currentDate).subtract(1, 'year');
      expect(getAgeUtil(pastYear).age).toBe(1);
      expect(getAgeUtil(pastYear).ageUnitSelection).toBe('years');
    });
  });

  describe('when the age is in month', () => {
    it('returns age as 1 & ageUnitSelection as m', () => {
      var pastMonth = moment(currentDate).subtract(1, 'month');
      expect(getAgeUtil(pastMonth).age).toBe(1);
      expect(getAgeUtil(pastMonth).ageUnitSelection).toBe('months');
    });

    it('returns age as 1 year if 12 months old & ageUnitSelection as y', () => {
      var pastMonth = moment(currentDate).subtract(12, 'months');
      expect(getAgeUtil(pastMonth).age).toBe(1);
      expect(getAgeUtil(pastMonth).ageUnitSelection).toBe('years');
    });

    it('returns age as 11 months old & ageUnitSelection as m', () => {
      var pastMonth = moment(currentDate).subtract(11, 'months');
      expect(getAgeUtil(pastMonth).age).toBe(11);
      expect(getAgeUtil(pastMonth).ageUnitSelection).toBe('months');
    });
  });

  describe('when 1 month between short month dates like 2/28 to 3/29', () => {
    it('returns 1 month', () => {
      const february = moment('2005-02-28');
      expect(getAgeUtil(february, moment('2005-03-29')).age).toBe(1);
    });
  });

  describe('when less than 1 month between short month dates like 2/28 to 3/27', () => {
    it('returns days', () => {
      const february = moment('2005-02-28');
      expect(getAgeUtil(february, moment('2005-03-27')).age).toBe(27);
    });
  });

  describe('when the age is one day', () => {
    it('returns age as 1 & ageUnitSelection as d', () => {
      var pastDay = moment(currentDate).subtract(1, 'day');
      expect(getAgeUtil(pastDay).age).toBe(1);
      expect(getAgeUtil(pastDay).ageUnitSelection).toBe('days');
    });

    it('returns age 1 month if 32 days old & ageUnitSelection as m', () => {
      var pastDay = moment(currentDate).subtract(32, 'days');
      expect(getAgeUtil(pastDay).age).toBe(1);
      expect(getAgeUtil(pastDay).ageUnitSelection).toBe('months');
    });
  });

  describe('when the dob is invalid', () => {
    it('returns age & ageUnitSelection as empty string', () => {
      var futureYear = moment(currentDate).add(2, 'years');
      expect(getAgeUtil(futureYear).age).toBe('');
      expect(getAgeUtil(futureYear).ageUnitSelection).toBe('');
    });
  });
});

describe('#estimatedDoB()', () => {
  it('returns estimated Date of Birth', () => {
    var estimatedDateOfBirth = moment()
      .subtract(2, 'years')
      .format('MM/DD/YYYY');
    expect(estimatedDoB(2, 'y')).toBe(estimatedDateOfBirth);
    var estimatedBirthDate = moment()
      .subtract(2, 'days')
      .format('MM/DD/YYYY');
    expect(estimatedDoB(2, 'd')).toBe(estimatedBirthDate);
  });
});

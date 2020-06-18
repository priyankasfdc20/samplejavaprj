import {
  toCapitalizeCase,
  toSecondaryRelationship,
  formatClient,
  formatTable,
  toDateFormat,
  toDateTimeFormat,
  trimSafely,
  getCardHeaderText,
} from './formatters';

describe('formatters', () => {
  describe('toCapitalizeCase()', () => {
    it('returns a capitalized string', () => {
      expect(toCapitalizeCase('HELLO')).toEqual('Hello');
    });

    it('handles non-string arguments', () => {
      const inputs = [{ a: 1 }, false, [], 'FOO BAR'];
      expect(toCapitalizeCase(inputs[0])).toBe(inputs[0]);
      expect(toCapitalizeCase(inputs[1])).toBe(inputs[1]);
      expect(toCapitalizeCase(inputs[2])).toBe(inputs[2]);
      expect(toCapitalizeCase(inputs[3])).not.toBe(inputs[3]);
    });

    it('handles extra whitespace', () => {
      expect(toCapitalizeCase('   before')).toEqual('Before');
      expect(toCapitalizeCase('AFTER    ')).toEqual('After');
      expect(toCapitalizeCase('IN   BETWEEN')).toEqual('In Between');
    });
  });

  describe('toDateFormat()', () => {
    it('returns a formatted date', () => {
      expect(toDateFormat('2012-05-31')).toEqual('5/31/2012');
    });

    it('returns a formatted date only when date and time in input', () => {
      expect(toDateFormat('1941-12-07T12:00:00')).toEqual('12/7/1941');
    });
  });

  describe('toDateTimeFormat()', () => {
    it('returns a formatted date/time for PM', () => {
      expect(toDateTimeFormat('2012-05-31T12:00:01')).toEqual(
        '5/31/2012 - 12:00 PM'
      );
    });

    it('returns a formatted date/time for AM', () => {
      expect(toDateTimeFormat('2010-01-01T00:00:01')).toEqual(
        '1/01/2010 - 0:00 AM'
      );
    });
  });

  describe('#trimSafely()', () => {
    it('returns original string if null', () => {
      expect(trimSafely('hello')).toEqual('hello');
    });

    it('returns empty string if null input', () => {
      expect(trimSafely(null)).toEqual('');
    });

    it('returns empty string if undefined input', () => {
      expect(trimSafely(undefined)).toEqual('');
    });

    it('returns empty string if empty string input', () => {
      expect(trimSafely('')).toEqual('');
    });
  });

  describe('toSecondaryRelationship', () => {
    it('returns the secondary relationships in relationshiptype', () => {
      expect(toSecondaryRelationship('Daughter/Father (Adoptive)')).toEqual(
        'Father (Adoptive)'
      );
      expect(toSecondaryRelationship('Aunt/Nephew (Maternal)')).toEqual(
        'Nephew (Maternal)'
      );
      expect(toSecondaryRelationship('Live-in/Live-in')).toEqual('Live-in');
      expect(
        toSecondaryRelationship('Child/Residential Facility Staff')
      ).toEqual('Residential Facility Staff');
    });
  });

  describe('formatClient()', () => {
    it('formats the  object to be pass on react-bootstrap table', () => {
      const data = {
        common_first_name: 'hello',
        common_last_name: 'world',
        address: {
          street_name: 'foo',
          street_number: 'bar',
        },
        relationship_type: 'Aunt/Nephew (Maternal)',
      };
      const { name, address } = formatClient(data);
      expect(name).toBe('hello world');
      expect(address).toBe('foo bar');
    });

    it('formats the object in the table to data with client birth date and age', () => {
      const data = {
        common_first_name: 'hello',
        common_last_name: 'world',
        address: {
          street_name: 'foo',
          street_number: 'bar',
        },
        birth_dt: '1986-11-06',
        relationship_type: 'Aunt/Nephew (Maternal)',
      };
      const { ageBirth } = formatClient(data);
      expect(ageBirth).toBe('31 | 1986-11-06');
    });
  });

  describe('#formatTable', () => {
    it('expects an array', () =>
      expect(formatTable(['world'])).toEqual([{ otherEthnicity: ['world'] }]));

    it('returns an empty array if it is undefined', () =>
      expect(formatTable(undefined)).toEqual([]));
  });

  describe('#getCardHeaderText()', () => {
    const someHeader = 'Some header';

    it('text not changed when status is not ready', () => {
      const actual = getCardHeaderText(
        {
          XHRStatus: 'any',
          records: [],
        },
        someHeader
      );
      expect(actual).toEqual(someHeader);
    });

    it('text not changed when records are undefined', () => {
      const actual = getCardHeaderText(
        {
          XHRStatus: 'ready',
          records: undefined,
        },
        someHeader
      );
      expect(actual).toEqual(someHeader);
    });

    it('text not changed when records are null', () => {
      const actual = getCardHeaderText(
        {
          XHRStatus: 'ready',
          records: null,
        },
        someHeader
      );
      expect(actual).toEqual(someHeader);
    });

    it('text formatted when status is ready and empty records', () => {
      const actual = getCardHeaderText(
        {
          XHRStatus: 'ready',
          records: [],
        },
        someHeader
      );
      expect(actual).toEqual('Some header (0)');
    });

    it('text formatted when status is ready and 2 records', () => {
      const actual = getCardHeaderText(
        {
          XHRStatus: 'ready',
          records: [{}, {}],
        },
        someHeader
      );
      expect(actual).toEqual('Some header (2)');
    });
  });
});

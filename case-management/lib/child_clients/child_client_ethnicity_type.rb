# frozen_string_literal: true

# rubocop:disable Metrics/ClassLength, Metrics/MethodLength

module ChildClients
  class ChildClientEthnicityType
    def ethnicity_type(other_ethnicity_types)
      short_type = ethnicity_code.find { |type| type[:system_id] == other_ethnicity_types }
      short_type ? short_type[:short_description] : ''
    end

    private

    def ethnicity_code
      [
        {
          'system_id': 820,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '05',
          'third_id': '0000000000',
          'other_code': '05',
          'inactive_indicator': false,
          'short_description': 'Alaskan Native*',
          'long_description': 'American Indian or Alaskan Native'
        },
        {
          'system_id': 821,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '06',
          'third_id': '0000000000',
          'other_code': '05',
          'inactive_indicator': false,
          'short_description': 'American Indian*',
          'long_description': 'American Indian or Alaskan Native'
        },
        {
          'system_id': 822,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': 'N',
          'third_id': '0000000000',
          'other_code': '13',
          'inactive_indicator': false,
          'short_description': 'Asian Indian*',
          'long_description': 'Asian'
        },
        {
          'system_id': 823,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '03',
          'third_id': '0000000000',
          'other_code': '03',
          'inactive_indicator': false,
          'short_description': 'Black*',
          'long_description': 'Black or African American'
        },
        {
          'system_id': 824,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': 'H',
          'third_id': '0000000000',
          'other_code': '16',
          'inactive_indicator': false,
          'short_description': 'Cambodian*',
          'long_description': 'Asian'
        },
        {
          'system_id': 825,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': 'C',
          'third_id': '0000000000',
          'other_code': '06',
          'inactive_indicator': false,
          'short_description': 'Chinese*',
          'long_description': 'Asian'
        },
        {
          'system_id': 826,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': 'E',
          'third_id': '0000000000',
          'other_code': '03',
          'inactive_indicator': false,
          'short_description': 'Ethiopian*',
          'long_description': 'Black or African American'
        },
        {
          'system_id': 827,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '07',
          'third_id': '0000000000',
          'other_code': '07',
          'inactive_indicator': false,
          'short_description': 'Filipino*',
          'long_description': 'Asian'
        },
        {
          'system_id': 828,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': 'R',
          'third_id': '0000000000',
          'other_code': '12',
          'inactive_indicator': false,
          'short_description': 'Guamanian*',
          'long_description': 'Native Hawaiian or Other Pacific Islander'
        },
        {
          'system_id': 829,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': 'P',
          'third_id': '0000000000',
          'other_code': '11',
          'inactive_indicator': false,
          'short_description': 'Hawaiian*',
          'long_description': 'Native Hawaiian or Other Pacific Islander'
        },
        {
          'system_id': 830,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '02',
          'third_id': '0000000000',
          'other_code': '02',
          'inactive_indicator': false,
          'short_description': 'Hispanic',
          'long_description': 'White'
        },
        {
          'system_id': 831,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': 'J',
          'third_id': '0000000000',
          'other_code': '08',
          'inactive_indicator': false,
          'short_description': 'Japanese*',
          'long_description': 'Asian'
        },
        {
          'system_id': 832,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': 'K',
          'third_id': '0000000000',
          'other_code': '09',
          'inactive_indicator': false,
          'short_description': 'Korean*',
          'long_description': 'Asian'
        },
        {
          'system_id': 833,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': 'T',
          'third_id': '0000000000',
          'other_code': '15',
          'inactive_indicator': false,
          'short_description': 'Laotian*',
          'long_description': 'Asian'
        },
        {
          'system_id': 834,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '04',
          'third_id': '0000000000',
          'other_code': '17',
          'inactive_indicator': true,
          'short_description': 'Other Asian/Pacific Islander*',
          'long_description': ''
        },
        {
          'system_id': 835,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '04',
          'third_id': '0000000000',
          'other_code': '17',
          'inactive_indicator': false,
          'short_description': 'Hmong*',
          'long_description': 'Native Hawaiian or Other Pacific Islander'
        },
        {
          'system_id': 836,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '04',
          'third_id': '0000000000',
          'other_code': '17',
          'inactive_indicator': false,
          'short_description': 'Polynesian*',
          'long_description': 'Native Hawaiian or Other Pacific Islander'
        },
        {
          'system_id': 837,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': 'M',
          'third_id': '0000000000',
          'other_code': '10',
          'inactive_indicator': false,
          'short_description': 'Samoan*',
          'long_description': 'Native Hawaiian or Other Pacific Islander'
        },
        {
          'system_id': 838,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': 'V',
          'third_id': '0000000000',
          'other_code': '14',
          'inactive_indicator': false,
          'short_description': 'Vietnamese*',
          'long_description': 'Asian'
        },
        {
          'system_id': 839,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '01',
          'third_id': '0000000000',
          'other_code': '01',
          'inactive_indicator': false,
          'short_description': 'White*',
          'long_description': 'White'
        },
        {
          'system_id': 840,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '01',
          'third_id': '0000000000',
          'other_code': '01',
          'inactive_indicator': false,
          'short_description': 'White - Armenian*',
          'long_description': 'White'
        },
        {
          'system_id': 841,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '01',
          'third_id': '0000000000',
          'other_code': '01',
          'inactive_indicator': false,
          'short_description': 'White - Central American*',
          'long_description': 'White'
        },
        {
          'system_id': 842,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '01',
          'third_id': '0000000000',
          'other_code': '01',
          'inactive_indicator': false,
          'short_description': 'White - European*',
          'long_description': 'White'
        },
        {
          'system_id': 843,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '01',
          'third_id': '0000000000',
          'other_code': '01',
          'inactive_indicator': false,
          'short_description': 'White - Middle Eastern*',
          'long_description': 'White'
        },
        {
          'system_id': 844,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '01',
          'third_id': '0000000000',
          'other_code': '01',
          'inactive_indicator': false,
          'short_description': 'White - Romanian*',
          'long_description': 'White'
        },
        {
          'system_id': 3162,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '02',
          'third_id': '0000000000',
          'other_code': '02',
          'inactive_indicator': false,
          'short_description': 'Caribbean',
          'long_description': 'White'
        },
        {
          'system_id': 3163,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '01',
          'third_id': '0000000000',
          'other_code': '02',
          'inactive_indicator': false,
          'short_description': 'Central American',
          'long_description': 'White'
        },
        {
          'system_id': 3164,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '02',
          'third_id': '0000000000',
          'other_code': '02',
          'inactive_indicator': false,
          'short_description': 'Mexican',
          'long_description': 'White'
        },
        {
          'system_id': 3165,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '02',
          'third_id': '0000000000',
          'other_code': '02',
          'inactive_indicator': false,
          'short_description': 'South American',
          'long_description': 'White'
        },
        {
          'system_id': 5922,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '04',
          'third_id': '0000000000',
          'other_code': '17',
          'inactive_indicator': false,
          'short_description': 'Other Asian*',
          'long_description': 'Asian'
        },
        {
          'system_id': 5923,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '04',
          'third_id': '0000000000',
          'other_code': '17',
          'inactive_indicator': false,
          'short_description': 'Other Pacific Islander*',
          'long_description': 'Native Hawaiian or Other Pacific Islander'
        },
        {
          'system_id': 6351,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '99',
          'third_id': '0000000000',
          'other_code': '99',
          'inactive_indicator': false,
          'short_description': 'Unable to Determine*',
          'long_description': 'Unable to Determine'
        },
        {
          'system_id': 6352,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '99',
          'third_id': '0000000000',
          'other_code': '99',
          'inactive_indicator': false,
          'short_description': 'Declines to State*',
          'long_description': 'Declines to State'
        },
        {
          'system_id': 6453,
          'meta_code': 'ETHNCTYC',
          'category_id': 0,
          'logical_id': '99',
          'third_id': '0000000000',
          'other_code': '99',
          'inactive_indicator': false,
          'short_description': 'Other Race Unknown*',
          'long_description': ''
        }
      ]
    end
  end
end
# rubocop:enable Metrics/ClassLength, Metrics/MethodLength

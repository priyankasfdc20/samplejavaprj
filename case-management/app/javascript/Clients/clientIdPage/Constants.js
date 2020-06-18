import _ from 'lodash';

export const PREFIX = [
  { value: 'Mr.', label: 'Mr.' },
  { value: 'Mrs.', label: 'Mrs.' },
  { value: 'Miss', label: 'Miss' },
  { value: 'Ms.', label: 'Ms.' },
  { value: 'Dr.', label: 'Dr.' },
  { value: 'Rev.', label: 'Rev.' },
];

export const SUFFIX = [
  { value: 'Esq.', label: 'Esq.' },
  { value: 'Sr.', label: 'Sr.' },
  { value: 'Jr.', label: 'Jr.' },
  { value: 'I.', label: 'I.' },
  { value: 'II.', label: 'II.' },
  { value: 'III.', label: 'III.' },
  { value: 'IV.', label: 'IV.' },
  { value: 'M.D.', label: 'M.D.' },
  { value: 'Ph.D.', label: 'Ph.D.' },
  { value: 'D.D.S.', label: 'D.D.S.' },
];

export const GENDERS = Object.freeze(
  _.sortBy(
    [
      { value: 'U', label: 'Unknown' },
      { value: 'M', label: 'Male' },
      { value: 'I', label: 'Intersex' },
      { value: 'F', label: 'Female' },
    ],
    ['value', 'label']
  )
);

export const MARITAL_STATUS = [
  { value: '0', label: 'Married' },
  { value: '1', label: 'Never Married' },
  { value: '2', label: 'Widowed' },
  { value: '3', label: 'Divorced' },
];
export const AGE_UNITS = [
  { value: 'days', label: 'Days' },
  { value: 'months', label: 'Months' },
  { value: 'years', label: 'Years' },
];
export const STATE_TYPES = [
  { value: '0', label: 'CA' },
  { value: '1', label: 'NY' },
];
export const NAME_TYPES = [
  { value: 'Legal', label: 'Legal' },
  { value: 'Aka', label: 'AKa' },
  { value: 'Doe', label: 'Doe' },
  { value: 'Maiden', label: 'Maiden' },
  { value: 'Unknown', label: 'Unknown' },
];
export const CSEC_TYPES = [
  { value: '6750', label: 'At risk' },
  { value: '6680', label: 'Victim before foster care' },
  { value: '6681', label: 'Victim while absent from placement' },
  { value: '6682', label: 'In open case while not in foster care' },
];

export const PRIMARY_LANGUAGES = [
  { value: '0', label: 'English' },
  { value: '1', label: 'Spanish' },
  { value: '2', label: 'French' },
  { value: '3', label: 'Hindi' },
  { value: '4', label: 'Chinese' },
];
export const SECONDARY_LANGUAGES = [
  { value: '0', label: 'English' },
  { value: '1', label: 'Spanish' },
  { value: '2', label: 'Chinese' },
  { value: '3', label: 'Hindi' },
  { value: '4', label: 'French' },
];
export const LITERATE = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
  { value: 'U', label: 'Unknown' },
  { value: 'NOT_APPLICABLE', label: 'Not Applicable' },
];
export const INCAPACITATED_PARENT = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
  { value: 'U', label: 'Unknown' },
  { value: 'NOT_APPLICABLE', label: 'Not Applicable' },
];

export const ICWA_COUNTIES = [
  { value: 'Los Angeles County', label: 'Los Angeles County' },
  { value: 'Sacramento County', label: 'Sacramento County' },
  { value: 'El Dorado County', label: 'El Dorado County' },
  { value: 'Yuba County', label: 'Yuba County' },
  { value: 'Merced County', label: 'Merced County' },
];

export const ICWA_ELIGIBLE = ['Yes', 'No', 'Not Asked', 'Pending'];

export const REASONS = [
  { value: 'Carrying Guns in Home', label: 'Carrying Guns in Home' },
  { value: 'Dangerous Environment', label: 'Dangerous Environment' },
  {
    value: 'Aggressive dog on premises, yard not fenced',
    label: 'Aggressive dog on premises, yard not fenced',
  },
];

export const UNABLE_TO_DETERMINE_REASON = Object.freeze(
  _.sortBy(
    [
      { value: 'Abandonment', label: 'Abandonment' },
      { value: 'Incapacitation', label: 'Incapacitation' },
      { value: 'Individual doesnt know', label: 'Individual Does Not Know' },
    ],
    ['value', 'label']
  )
);

export const HISPANIC = [
  'Yes',
  'No',
  'Unable to Determine',
  'Declined to State',
];

export const RACE = [
  { value: 'Alaskan Native*', label: 'Alaskan Native' },
  { value: 'American Indian*', label: 'American Indian' },
  { value: 'Black*', label: 'Black' },
  { value: 'Cambodian*', label: 'Cambodian' },
  { value: 'Carribean*', label: 'Carribean' },
  { value: 'Central American*', label: 'Central American' },
  { value: 'Chinese*', label: 'Chinese' },
  { value: 'Declines to state*', label: ' Declines to state' },
  { value: 'Ethiopian*', label: 'Ethiopian' },
  { value: 'Filipino*', label: 'Filipino' },
  { value: 'Guamanian*', label: 'Guamanian' },
  { value: 'Hawaiian*', label: 'Hawaiian' },
  { value: 'Hispanic*', label: 'Hispanic' },
  { value: 'Hmong*', label: 'Hmong' },
  { value: 'Japanese*', label: 'Japanese' },
  { value: 'Korean*', label: 'Korean' },
  { value: 'Laotian*', label: 'Laotian' },
  { value: 'Mexican*', label: 'Mexican' },
  { value: 'Other Asian*', label: 'Other Asian ' },
  {
    value: 'Other Asian/Pacific Islander*',
    label: 'Other Asian/Pacific Islander',
  },
  { value: 'Other Pacific Islander*', label: 'Other Pacific Islander' },
  { value: 'Other Race/Unknown*', label: 'Other Race/Unknown' },
  { value: 'Polynesian*', label: 'Polynesian' },
  { value: 'Samoan*', label: 'Samoan' },
  { value: 'South American*', label: 'South American' },
  {
    value: 'Unable to Determine*',
    label: 'Unable to Determine',
  },
  { value: 'Vietnamese*', label: 'Vietnamese' },
  { value: 'White American*', label: 'White American' },
  { value: 'White Central American*', label: 'White Central American' },
  { value: 'White European*', label: 'White European' },
  { value: 'White Middle Eastern*', label: 'White Middle Eastern' },
  { value: 'White Romanian*', label: 'White Romanian' },
  { value: 'White*', label: 'White' },
];

const RACE_ETHNICITIES = [
  {
    value: 'Unable to Determine*',
    label: 'Unable to Determine',
    disabled: true,
  },
  { value: 'Declines to state*', label: 'Declines to state', disabled: true },
].concat(RACE);

export const OTHER_ETHNICITY = _.uniqBy(RACE_ETHNICITIES, 'value');

export const RACE_REASON = [
  { value: 'Black', label: 'Black' },
  { value: 'Ethiopian', label: 'Ethiopian' },
  { value: 'Carribean', label: 'Carribean' },
];

export const COUNTY_LIST = [
  { value: '1068', label: 'Alameda' },
  { value: '1069', label: 'Alpine' },
  { value: '1070', label: 'Amador' },
  { value: '1071', label: 'Butte' },
  { value: '1072', label: 'Calaveras' },
  { value: '1073', label: 'Colusa' },
  { value: '1074', label: 'Contra Costa' },
  { value: '1075', label: 'Del Norte' },
  { value: '1076', label: 'El Dorado' },
  { value: '1077', label: 'Fresno' },
  { value: '1078', label: 'Glenn' },
  { value: '1079', label: 'Humboldt' },
  { value: '1080', label: 'Imperial' },
  { value: '1081', label: 'Inyo' },
  { value: '1082', label: 'Kern' },
  { value: '1083', label: 'Kings' },
  { value: '1084', label: 'Lake' },
  { value: '1085', label: 'Lassen' },
  { value: '1086', label: 'Los Angeles' },
  { value: '1087', label: 'Madera' },
  { value: '1088', label: 'Marin' },
  { value: '1089', label: 'Mariposa' },
  { value: '1090', label: 'Mendocino' },
  { value: '1091', label: 'Merced' },
  { value: '1092', label: 'Modoc' },
  { value: '1093', label: 'Mono' },
  { value: '1094', label: 'Monterey' },
  { value: '1095', label: 'Napa' },
  { value: '1096', label: 'Nevada' },
  { value: '1097', label: 'Orange' },
  { value: '1098', label: 'Placer' },
  { value: '1099', label: 'Plumas' },
  { value: '1100', label: 'Riverside' },
  { value: '1101', label: 'Sacramento' },
  { value: '1102', label: 'San Benito' },
  { value: '1103', label: 'San Bernardino' },
  { value: '1104', label: 'San Diego' },
  { value: '1105', label: 'San Francisco' },
  { value: '1106', label: 'San Joaquin' },
  { value: '1107', label: 'San Luis Obispo' },
  { value: '1108', label: 'San Mateo' },
  { value: '1109', label: 'Santa Barbara' },
  { value: '1110', label: 'Santa Clara' },
  { value: '1111', label: 'Santa Cruz' },
  { value: '1112', label: 'Shasta' },
  { value: '1113', label: 'Sierra' },
  { value: '1114', label: 'Siskiyou' },
  { value: '1115', label: 'Solano' },
  { value: '1116', label: 'Sonoma' },
  { value: '1117', label: 'Stanislaus' },
  { value: '1118', label: 'Sutter' },
  { value: '1119', label: 'Tehama' },
  { value: '1120', label: 'Trinity' },
  { value: '1121', label: 'Tulare' },
  { value: '1122', label: 'Tuolumne' },
  { value: '1123', label: 'Ventura' },
  { value: '1124', label: 'Yolo' },
  { value: '1125', label: 'Yuba' },
  { value: '1126', label: 'State of California' },
];
export const SOGIE_REASONS_UNABLE = [
  { value: 'Did Not Ask', label: 'Did Not Ask' },
  { value: 'Client Does Not Know', label: 'Client Does Not Know' },
];
export const SEXUAL_ORIENTATION = [
  { value: 'Asexual', label: 'Asexual' },
  { value: 'Bisexual', label: 'Bisexual' },
  { value: 'Gay', label: 'Gay' },
  { value: 'Lesbian', label: 'Lesbian' },
  {
    value: 'Straight or Heterosexual',
    label: 'Straight or Heterosexual',
  },
  {
    value: 'Declines to state',
    label: 'Declines to state',
  },
  {
    value: 'Not Listed',
    label: 'Not Listed',
  },
  {
    value:
      'Unable to Determine- (if chosen must choose from the following sub-options)',
    label:
      'Unable to Determine- (if chosen must choose from the following sub-options)',
  },
];
export const GENDER_IDENTITY = [
  { value: 'Female', label: 'Female' },
  {
    value: 'Gender Queer',
    label: 'Gender Queer',
  },
  {
    value: 'Gender Non-Binary',
    label: 'Gender Non-Binary',
  },
  { value: 'Male', label: 'Male' },
  { value: 'Transgender Female', label: 'Transgender Female' },
  { value: 'Transgender Male', label: 'Transgender Male' },
  { value: 'Not Listed', label: 'Not Listed' },
  { value: 'Unsure', label: 'Unsure' },
  { value: 'Declines to State', label: 'Declines to State' },
  { value: 'Did Not Ask', label: 'Did Not Ask' },
];
export const GENDER_EXPRESSION = [
  {
    value: 'Androgynous/Gender Non-conforming',
    label: 'Androgynous/Gender Non-conforming',
  },
  {
    value: 'Both Masculine and Feminine',
    label: 'Both Masculine and Feminine',
  },
  {
    value: 'Feminine',
    label: 'Feminine',
  },
  { value: 'Masculine', label: 'Masculine' },
  { value: 'Declines to State', label: 'Declines to State' },
  { value: 'Did Not Ask', label: 'Did Not Ask' },
];

export const RELATIONSHIP_TYPES = [
  {
    value: 175,
    logical_code: 'A',
    gender_code: 'FM',
    label: 'Aunt/Nephew (Maternal)',
  },
  {
    value: 176,
    logical_code: 'A',
    gender_code: 'FM',
    label: 'Aunt/Nephew (Paternal)',
  },
  {
    value: 177,
    logical_code: 'A',
    gender_code: 'FF',
    label: 'Aunt/Niece (Maternal)',
  },
  {
    value: 178,
    logical_code: 'A',
    gender_code: 'FF',
    label: 'Aunt/Niece (Paternal)',
  },
  {
    value: 179,
    logical_code: 'BR',
    gender_code: 'MM',
    label: 'Brother/Brother',
  },
  {
    value: 180,
    logical_code: 'BR',
    gender_code: 'MM',
    label: 'Brother/Brother (Half)',
  },
  {
    value: 181,
    logical_code: 'BR',
    gender_code: 'MM',
    label: 'Brother/Brother (Step)',
  },
  {
    value: 182,
    logical_code: 'BR',
    gender_code: 'MF',
    label: 'Brother/Sister',
  },
  {
    value: 183,
    logical_code: 'BR',
    gender_code: 'MF',
    label: 'Brother/Sister (Half)',
  },
  {
    value: 184,
    logical_code: 'BR',
    gender_code: 'MF',
    label: 'Brother/Sister (Step)',
  },
  {
    value: 185,
    logical_code: 'CS',
    gender_code: 'UU',
    label: 'Cousin/Cousin (Maternal)',
  },
  {
    value: 186,
    logical_code: 'CS',
    gender_code: 'UU',
    label: 'Cousin/Cousin (Paternal)',
  },
  {
    value: 187,
    logical_code: 'D',
    gender_code: 'FU',
    label: 'Daughter/De Facto Parent',
  },
  {
    value: 188,
    logical_code: 'D',
    gender_code: 'fM',
    label: 'Daughter/Father (Adoptive)',
  },
  {
    value: 189,
    logical_code: 'D',
    gender_code: 'fM',
    label: 'Daughter/Father (Alleged)',
  },
  {
    value: 190,
    logical_code: 'D',
    gender_code: 'fM',
    label: 'Daughter/Father (Birth)',
  },
  {
    value: 191,
    logical_code: 'FD',
    gender_code: 'FM',
    label: 'Daughter/Father (Foster)',
  },
  {
    value: 192,
    logical_code: 'D',
    gender_code: 'fM',
    label: 'Daughter/Father (Presumed)',
  },
  {
    value: 193,
    logical_code: 'SD',
    gender_code: 'FM',
    label: 'Daughter/Father (Step)',
  },
  {
    value: 194,
    logical_code: 'D',
    gender_code: 'fF',
    label: 'Daughter/Mother (Adoptive)',
  },
  {
    value: 195,
    logical_code: 'D',
    gender_code: 'fF',
    label: 'Daughter/Mother (Alleged)',
  },
  {
    value: 196,
    logical_code: 'D',
    gender_code: 'fF',
    label: 'Daughter/Mother (Birth)',
  },
  {
    value: 197,
    logical_code: 'FD',
    gender_code: 'FF',
    label: 'Daughter/Mother (Foster)',
  },
  {
    value: 198,
    logical_code: 'D',
    gender_code: 'fF',
    label: 'Daughter/Mother (Presumed)',
  },
  {
    value: 199,
    logical_code: 'SD',
    gender_code: 'FF',
    label: 'Daughter/Mother (Step)',
  },
  {
    value: 200,
    logical_code: 'D',
    gender_code: 'FU',
    label: '* Daughter/Non-Custodial Parent',
  },
  {
    value: 201,
    logical_code: 'DFP',
    gender_code: 'UF',
    label: 'De Facto Parent/Daughter',
  },
  {
    value: 202,
    logical_code: 'DFP',
    gender_code: 'UM',
    label: 'De Facto Parent/Son',
  },
  {
    value: 203,
    logical_code: 'F',
    gender_code: 'Mf',
    label: 'Father/Daughter (Adoptive)',
  },
  {
    value: 204,
    logical_code: 'F',
    gender_code: 'Mf',
    label: 'Father/Daughter (Alleged)',
  },
  {
    value: 205,
    logical_code: 'F',
    gender_code: 'Mf',
    label: 'Father/Daughter (Birth)',
  },
  {
    value: 206,
    logical_code: 'FF',
    gender_code: 'MF',
    label: 'Father/Daughter (Foster)',
  },
  {
    value: 207,
    logical_code: 'F',
    gender_code: 'Mf',
    label: 'Father/Daughter (Presumed)',
  },
  {
    value: 208,
    logical_code: 'SF',
    gender_code: 'MF',
    label: 'Father/Daughter (Step)',
  },
  {
    value: 209,
    logical_code: 'F',
    gender_code: 'Mm',
    label: 'Father/Son (Adoptive)',
  },
  {
    value: 210,
    logical_code: 'F',
    gender_code: 'Mm',
    label: 'Father/Son (Alleged)',
  },
  {
    value: 211,
    logical_code: 'F',
    gender_code: 'Mm',
    label: 'Father/Son (Birth)',
  },
  {
    value: 212,
    logical_code: 'FF',
    gender_code: 'MM',
    label: 'Father/Son (Foster)',
  },
  {
    value: 213,
    logical_code: 'F',
    gender_code: 'Mm',
    label: 'Father/Son (Presumed)',
  },
  {
    value: 214,
    logical_code: 'SF',
    gender_code: 'MM',
    label: 'Father/Son (Step)',
  },
  {
    value: 215,
    logical_code: 'OTH',
    gender_code: 'UU',
    label: 'Godchild/Godparent',
  },
  {
    value: 216,
    logical_code: 'SR',
    gender_code: 'UU',
    label: 'Godparent/Godchild',
  },
  {
    value: 217,
    logical_code: 'GD',
    gender_code: 'FU',
    label: 'Granddaughter/Grandparent (Maternal)',
  },
  {
    value: 218,
    logical_code: 'GD',
    gender_code: 'FU',
    label: 'Granddaughter/Grandparent (Paternal)',
  },
  {
    value: 219,
    logical_code: 'GD',
    gender_code: 'FU',
    label: 'Granddaughter/Great Grandparent (Matrnl)',
  },
  {
    value: 220,
    logical_code: 'GD',
    gender_code: 'FU',
    label: 'Granddaughter/Great Grandparent (Patrnl)',
  },
  {
    value: 221,
    logical_code: 'GP',
    gender_code: 'UF',
    label: 'Grandparent/Granddaughter (Maternal)',
  },
  {
    value: 222,
    logical_code: 'GP',
    gender_code: 'UF',
    label: 'Grandparent/Granddaughter (Paternal)',
  },
  {
    value: 223,
    logical_code: 'GP',
    gender_code: 'UM',
    label: 'Grandparent/Grandson (Maternal)',
  },
  {
    value: 224,
    logical_code: 'GP',
    gender_code: 'UM',
    label: 'Grandparent/Grandson (Paternal)',
  },
  {
    value: 225,
    logical_code: 'GS',
    gender_code: 'MU',
    label: 'Grandson/Grandparent (Maternal)',
  },
  {
    value: 226,
    logical_code: 'GS',
    gender_code: 'MU',
    label: 'Grandson/Grandparent (Paternal)',
  },
  {
    value: 227,
    logical_code: 'GS',
    gender_code: 'MU',
    label: 'Grandson/Great Grandparent (Maternal)',
  },
  {
    value: 228,
    logical_code: 'GS',
    gender_code: 'MU',
    label: 'Grandson/Great Grandparent (Paternal)',
  },
  {
    value: 229,
    logical_code: 'OTH',
    gender_code: 'FF',
    label: 'Great Aunt/Niece (Maternal)',
  },
  {
    value: 230,
    logical_code: 'OTH',
    gender_code: 'FF',
    label: 'Great Aunt/Niece (Paternal)',
  },
  {
    value: 231,
    logical_code: 'OTH',
    gender_code: 'UF',
    label: 'Great Grandparent/Granddaughter (Matrnl)',
  },
  {
    value: 232,
    logical_code: 'OTH',
    gender_code: 'UF',
    label: 'Great Grandparent/Granddaughter (Patrnl)',
  },
  {
    value: 233,
    logical_code: 'OTH',
    gender_code: 'UM',
    label: 'Great Grandparent/Grandson (Maternal)',
  },
  {
    value: 234,
    logical_code: 'OTH',
    gender_code: 'UM',
    label: 'Great Grandparent/Grandson (Paternal)',
  },
  {
    value: 235,
    logical_code: 'OTH',
    gender_code: 'MF',
    label: 'Great Uncle/Niece (Maternal)',
  },
  {
    value: 236,
    logical_code: 'OTH',
    gender_code: 'MF',
    label: 'Great Uncle/Niece (Paternal)',
  },
  {
    value: 237,
    logical_code: 'OTH',
    gender_code: 'FM',
    label: 'Great-Aunt/Nephew (Maternal)',
  },
  {
    value: 238,
    logical_code: 'OTH',
    gender_code: 'FM',
    label: 'Great-Aunt/Nephew (Paternal)',
  },
  {
    value: 239,
    logical_code: 'OTH',
    gender_code: 'MM',
    label: 'Great-Uncle/Nephew (Maternal)',
  },
  {
    value: 240,
    logical_code: 'OTH',
    gender_code: 'MM',
    label: 'Great-Uncle/Nephew (Paternal)',
  },
  { value: 241, logical_code: 'GU', gender_code: 'UU', label: 'Guardian/Ward' },
  {
    value: 242,
    logical_code: 'OTH',
    gender_code: 'UU',
    label: 'Indian Child/Indian Custodian',
  },
  {
    value: 243,
    logical_code: 'SR',
    gender_code: 'UU',
    label: 'Indian Custodian/Indian Child',
  },
  {
    value: 244,
    logical_code: 'BD',
    gender_code: 'UU',
    label: 'Live-in/Live-in',
  },
  {
    value: 245,
    logical_code: 'M',
    gender_code: 'Ff',
    label: 'Mother/Daughter (Adoptive)',
  },
  {
    value: 246,
    logical_code: 'M',
    gender_code: 'Ff',
    label: 'Mother/Daughter (Alleged)',
  },
  {
    value: 247,
    logical_code: 'M',
    gender_code: 'Ff',
    label: 'Mother/Daughter (Birth)',
  },
  {
    value: 248,
    logical_code: 'FM',
    gender_code: 'FF',
    label: 'Mother/Daughter (Foster)',
  },
  {
    value: 249,
    logical_code: 'SM',
    gender_code: 'FF',
    label: 'Mother/Daughter (Step)',
  },
  {
    value: 250,
    logical_code: 'M',
    gender_code: 'Fm',
    label: 'Mother/Son (Adoptive)',
  },
  {
    value: 251,
    logical_code: 'M',
    gender_code: 'Fm',
    label: 'Mother/Son (Alleged)',
  },
  {
    value: 252,
    logical_code: 'M',
    gender_code: 'Fm',
    label: 'Mother/Son (Birth)',
  },
  {
    value: 253,
    logical_code: 'FM',
    gender_code: 'FM',
    label: 'Mother/Son (Foster)',
  },
  {
    value: 254,
    logical_code: 'SM',
    gender_code: 'FM',
    label: 'Mother/Son (Step)',
  },
  {
    value: 255,
    logical_code: 'NP',
    gender_code: 'MF',
    label: 'Nephew/Aunt (Maternal)',
  },
  {
    value: 256,
    logical_code: 'NP',
    gender_code: 'MF',
    label: 'Nephew/Aunt (Paternal)',
  },
  {
    value: 257,
    logical_code: 'NP',
    gender_code: 'MF',
    label: 'Nephew/Great-Aunt (Maternal)',
  },
  {
    value: 258,
    logical_code: 'NP',
    gender_code: 'MF',
    label: 'Nephew/Great-Aunt (Paternal)',
  },
  {
    value: 259,
    logical_code: 'NP',
    gender_code: 'MM',
    label: 'Nephew/Great-Uncle (Maternal)',
  },
  {
    value: 260,
    logical_code: 'NP',
    gender_code: 'MM',
    label: 'Nephew/Great-Uncle (Paternal)',
  },
  {
    value: 261,
    logical_code: 'NP',
    gender_code: 'MM',
    label: 'Nephew/Uncle (Maternal)',
  },
  {
    value: 262,
    logical_code: 'NP',
    gender_code: 'MM',
    label: 'Nephew/Uncle (Paternal)',
  },
  {
    value: 263,
    logical_code: 'NC',
    gender_code: 'FF',
    label: 'Niece/Aunt (Maternal)',
  },
  {
    value: 264,
    logical_code: 'NC',
    gender_code: 'FF',
    label: 'Niece/Aunt (Paternal)',
  },
  {
    value: 265,
    logical_code: 'NC',
    gender_code: 'FF',
    label: 'Niece/Great Aunt (Maternal)',
  },
  {
    value: 266,
    logical_code: 'NC',
    gender_code: 'FF',
    label: 'Niece/Great Aunt (Paternal)',
  },
  {
    value: 267,
    logical_code: 'NC',
    gender_code: 'FM',
    label: 'Niece/Great Uncle (Maternal)',
  },
  {
    value: 268,
    logical_code: 'NC',
    gender_code: 'FM',
    label: 'Niece/Great Uncle (Paternal)',
  },
  {
    value: 269,
    logical_code: 'NC',
    gender_code: 'FM',
    label: 'Niece/Uncle (Maternal)',
  },
  {
    value: 270,
    logical_code: 'NC',
    gender_code: 'FM',
    label: 'Niece/Uncle (Paternal)',
  },
  {
    value: 271,
    logical_code: 'FR',
    gender_code: 'UU',
    label: 'No Relation/No Relation',
  },
  {
    value: 272,
    logical_code: 'CP',
    gender_code: 'UF',
    label: '* Non-Custodial Parent/Daughter',
  },
  {
    value: 273,
    logical_code: 'CP',
    gender_code: 'UM',
    label: '* Non-Custodial Parent/Son',
  },
  {
    value: 274,
    logical_code: 'OTH',
    gender_code: 'UU',
    label: 'Other Relative/Other Relative',
  },
  {
    value: 275,
    logical_code: 'OTH',
    gender_code: 'UU',
    label: 'Significant Other/Significant Other',
  },
  {
    value: 276,
    logical_code: 'SI',
    gender_code: 'FM',
    label: 'Sister/Brother',
  },
  {
    value: 277,
    logical_code: 'SI',
    gender_code: 'FM',
    label: 'Sister/Brother (Half)',
  },
  {
    value: 278,
    logical_code: 'SI',
    gender_code: 'FM',
    label: 'Sister/Brother (Step)',
  },
  { value: 279, logical_code: 'SI', gender_code: 'FF', label: 'Sister/Sister' },
  {
    value: 280,
    logical_code: 'SI',
    gender_code: 'FF',
    label: 'Sister/Sister (Half)',
  },
  {
    value: 281,
    logical_code: 'SI',
    gender_code: 'FF',
    label: 'Sister/Sister (Step)',
  },
  {
    value: 282,
    logical_code: 'S',
    gender_code: 'MU',
    label: 'Son/De Facto Parent',
  },
  {
    value: 283,
    logical_code: 'S',
    gender_code: 'mM',
    label: 'Son/Father (Adoptive)',
  },
  {
    value: 284,
    logical_code: 'S',
    gender_code: 'mM',
    label: 'Son/Father (Alleged)',
  },
  {
    value: 285,
    logical_code: 'S',
    gender_code: 'mM',
    label: 'Son/Father (Birth)',
  },
  {
    value: 286,
    logical_code: 'FS',
    gender_code: 'MM',
    label: 'Son/Father (Foster)',
  },
  {
    value: 287,
    logical_code: 'S',
    gender_code: 'mM',
    label: 'Son/Father (Presumed)',
  },
  {
    value: 288,
    logical_code: 'SS',
    gender_code: 'MM',
    label: 'Son/Father (Step)',
  },
  {
    value: 289,
    logical_code: 'S',
    gender_code: 'mF',
    label: 'Son/Mother (Adoptive)',
  },
  {
    value: 290,
    logical_code: 'S',
    gender_code: 'mF',
    label: 'Son/Mother (Alleged)',
  },
  {
    value: 291,
    logical_code: 'S',
    gender_code: 'mF',
    label: 'Son/Mother (Birth)',
  },
  {
    value: 292,
    logical_code: 'FS',
    gender_code: 'MF',
    label: 'Son/Mother (Foster)',
  },
  {
    value: 293,
    logical_code: 'SS',
    gender_code: 'MF',
    label: 'Son/Mother (Step)',
  },
  {
    value: 294,
    logical_code: 'S',
    gender_code: 'MU',
    label: '* Son/Non-Custodial Parent',
  },
  {
    value: 295,
    logical_code: 'SPL',
    gender_code: 'UU',
    label: 'Spouse/Spouse',
  },
  {
    value: 296,
    logical_code: 'UN',
    gender_code: 'MM',
    label: 'Uncle/Nephew (Maternal)',
  },
  {
    value: 297,
    logical_code: 'UN',
    gender_code: 'MM',
    label: 'Uncle/Nephew (Paternal)',
  },
  {
    value: 298,
    logical_code: 'UN',
    gender_code: 'MF',
    label: 'Uncle/Niece (Maternal)',
  },
  {
    value: 299,
    logical_code: 'UN',
    gender_code: 'MF',
    label: 'Uncle/Niece (Paternal)',
  },
  {
    value: 300,
    logical_code: 'UNK',
    gender_code: 'UU',
    label: 'Unknown/Unknown',
  },
  {
    value: 301,
    logical_code: 'OTH',
    gender_code: 'UU',
    label: 'Ward/Guardian',
  },
  {
    value: 5620,
    logical_code: 'M',
    gender_code: 'Ff',
    label: 'Mother/Daughter (Presumed)',
  },
  {
    value: 5993,
    logical_code: 'OTH',
    gender_code: 'UU',
    label: 'Child/Residential Facility Staff',
  },
  {
    value: 5994,
    logical_code: 'OTH',
    gender_code: 'UU',
    label: 'Residential Facility Staff/Child',
  },
  {
    value: 6360,
    logical_code: 'S',
    gender_code: 'mF',
    label: 'Son/Mother (Presumed)',
  },
  {
    value: 6361,
    logical_code: 'M',
    gender_code: 'Fm',
    label: 'Mother/Son (Presumed)',
  },
];

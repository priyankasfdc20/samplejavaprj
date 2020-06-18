import { RELATIONSHIP_TYPES } from '../../../Constants';

import {
  uniq,
  isGenderUnknown,
  getClientBirthDate,
  doesClientHaveDOB,
  isPrimaryClientYounger,
  isSecondaryClientYounger,
  bothHaveDOBandGender,
  bothHaveDOBnoGender,
  bothHaveDOBnoSecndryGender,
  bothHaveDOBnoPrmaryGender,
} from './helperMethods';

export const doBothHaveDOB = (primaryClient, secondaryClient) => {
  return doesClientHaveDOB(primaryClient) && doesClientHaveDOB(secondaryClient);
};

export const areGenderBothKnown = (primaryClient, secondaryClient) => {
  return !isGenderUnknown(primaryClient) && !isGenderUnknown(secondaryClient);
};

export const areGenderBothUnknown = (primaryClient, secondaryClient) => {
  return isGenderUnknown(primaryClient) && isGenderUnknown(secondaryClient);
};
export const isGenderPriKnownSecUnknown = (primaryClient, secondaryClient) => {
  return !isGenderUnknown(primaryClient) && isGenderUnknown(secondaryClient);
};

export const isGenderPriUnknownSecKnown = (primaryClient, secondaryClient) => {
  return isGenderUnknown(primaryClient) && !isGenderUnknown(secondaryClient);
};

export const noDOBnoGender = (
  primaryClient,
  secondaryClient,
  genderBothUnknown,
  genderPriUnknownSecKnown,
  genderPriKnownSecUnknown
) => {
  let genderCodesToReturn = [];

  if (genderPriUnknownSecKnown) {
    genderCodesToReturn.push(
      'm' + secondaryClient.gender_code,
      'f' + secondaryClient.gender_code,
      'M' + secondaryClient.gender_code,
      'F' + secondaryClient.gender_code,
      'M' + secondaryClient.gender_code.toLowerCase(),
      'F' + secondaryClient.gender_code.toLowerCase(),
      'F' + 'U',
      'M' + 'U'
    );
    genderCodesToReturn.push('UU');
  }
  if (genderPriKnownSecUnknown) {
    genderCodesToReturn.push(
      primaryClient.gender_code + 'm',
      primaryClient.gender_code + 'f',
      primaryClient.gender_code + 'M',
      primaryClient.gender_code + 'F',
      primaryClient.gender_code.toLowerCase() + 'M',
      primaryClient.gender_code.toLowerCase() + 'F',
      'U' + 'F',
      'U' + 'M'
    );
    genderCodesToReturn.push('UU');
  }
  if (genderBothUnknown) {
    genderCodesToReturn = uniq(RELATIONSHIP_TYPES.map(rec => rec.gender_code));
  }
  return genderCodesToReturn;
};

const bothClientsHaveDOB = (
  includeGenderCodes,
  primaryClient,
  secondaryClient,
  primaryClientIsYounger,
  secondaryClientIsYounger,
  genderBothKnown,
  genderBothUnknown,
  genderPriUnknownSecKnown,
  genderPriKnownSecUnknown
) => {
  let genderCodesReturned = [];
  if (genderBothKnown) {
    genderCodesReturned = bothHaveDOBandGender(
      primaryClient,
      secondaryClient,
      primaryClientIsYounger,
      secondaryClientIsYounger
    );
    includeGenderCodes.push(genderCodesReturned);
    includeGenderCodes.push('U' + secondaryClient.gender_code);
    includeGenderCodes.push(primaryClient.gender_code + 'U');
    includeGenderCodes.push('UU');
  }

  if (genderPriUnknownSecKnown) {
    genderCodesReturned = bothHaveDOBnoPrmaryGender(
      secondaryClient,
      primaryClientIsYounger,
      secondaryClientIsYounger
    );
    includeGenderCodes = includeGenderCodes.concat(genderCodesReturned);
    includeGenderCodes.push('UU');
  }
  if (genderPriKnownSecUnknown) {
    genderCodesReturned = bothHaveDOBnoSecndryGender(
      primaryClient,
      primaryClientIsYounger,
      secondaryClientIsYounger
    );
    includeGenderCodes = includeGenderCodes.concat(genderCodesReturned);
    includeGenderCodes.push('UU');
  }

  if (genderBothUnknown) {
    genderCodesReturned = bothHaveDOBnoGender(
      primaryClientIsYounger,
      secondaryClientIsYounger
    );
    includeGenderCodes = includeGenderCodes.concat(genderCodesReturned);
  }
  return includeGenderCodes;
};

const bothClientsDontHaveDOB = (
  includeGenderCodes,
  primaryClient,
  secondaryClient,
  genderBothKnown,
  genderBothUnknown,
  genderPriUnknownSecKnown,
  genderPriKnownSecUnknown
) => {
  let genderCodesReturned = [];
  if (genderBothKnown) {
    includeGenderCodes.push(
      primaryClient.gender_code.toLowerCase() + secondaryClient.gender_code
    );
    includeGenderCodes.push(
      primaryClient.gender_code + secondaryClient.gender_code.toLowerCase()
    );
    includeGenderCodes.push('U' + secondaryClient.gender_code);
    includeGenderCodes.push(primaryClient.gender_code + 'U');
    includeGenderCodes.push('UU');
  }

  if (
    genderBothUnknown ||
    genderPriUnknownSecKnown ||
    genderPriKnownSecUnknown
  ) {
    genderCodesReturned = noDOBnoGender(
      primaryClient,
      secondaryClient,
      genderBothUnknown,
      genderPriUnknownSecKnown,
      genderPriKnownSecUnknown
    );
    includeGenderCodes = includeGenderCodes.concat(genderCodesReturned);
  }
  return includeGenderCodes;
};
const checkGivenData = (primaryClient, secondaryClient) => {
  const bothHaveDOB = doBothHaveDOB(primaryClient, secondaryClient);
  const genderBothKnown = areGenderBothKnown(primaryClient, secondaryClient);
  const genderBothUnknown = areGenderBothUnknown(
    primaryClient,
    secondaryClient
  );
  const genderPriUnknownSecKnown = isGenderPriUnknownSecKnown(
    primaryClient,
    secondaryClient
  );
  const genderPriKnownSecUnknown = isGenderPriKnownSecUnknown(
    primaryClient,
    secondaryClient
  );
  const primaryClientBirthDate = getClientBirthDate(primaryClient);
  const secondaryClientBirthDate = getClientBirthDate(secondaryClient);
  const primaryClientIsYounger = isPrimaryClientYounger(
    primaryClientBirthDate,
    secondaryClientBirthDate
  );
  const secondaryClientIsYounger = isSecondaryClientYounger(
    primaryClientBirthDate,
    secondaryClientBirthDate
  );
  return {
    bothHaveDOB: bothHaveDOB,
    genderBothKnown: genderBothKnown,
    genderBothUnknown: genderBothUnknown,
    genderPriUnknownSecKnown: genderPriUnknownSecKnown,
    genderPriKnownSecUnknown: genderPriKnownSecUnknown,
    primaryClientIsYounger: primaryClientIsYounger,
    secondaryClientIsYounger: secondaryClientIsYounger,
  };
};
const relationshipDropdown = (primaryClient, secondaryClient) => {
  const parsedData = checkGivenData(primaryClient, secondaryClient);
  let includeGenderCodes = [];
  if (!parsedData.genderBothUnknown) {
    includeGenderCodes.push(
      primaryClient.gender_code + secondaryClient.gender_code
    );
  }
  if (parsedData.bothHaveDOB) {
    includeGenderCodes = bothClientsHaveDOB(
      includeGenderCodes,
      primaryClient,
      secondaryClient,
      parsedData.primaryClientIsYounger,
      parsedData.secondaryClientIsYounger,
      parsedData.genderBothKnown,
      parsedData.genderBothUnknown,
      parsedData.genderPriUnknownSecKnown,
      parsedData.genderPriKnownSecUnknown
    );
  }
  if (!parsedData.bothHaveDOB) {
    includeGenderCodes = bothClientsDontHaveDOB(
      includeGenderCodes,
      primaryClient,
      secondaryClient,
      parsedData.genderBothKnown,
      parsedData.genderBothUnknown,
      parsedData.genderPriUnknownSecKnown,
      parsedData.genderPriKnownSecUnknown
    );
  }
  includeGenderCodes = includeGenderCodes.map(rec => rec.replace(/I/g, 'U'));
  return RELATIONSHIP_TYPES.filter(rec =>
    includeGenderCodes.includes(rec.gender_code)
  ).filter(rec => !rec.label.match(/\*/));
};
export default relationshipDropdown;

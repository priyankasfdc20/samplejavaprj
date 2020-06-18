import { DateTime } from 'luxon';
import { getAgeUtil } from '../../_utils/ageCalc/getAgeFormat';
/**
 * Returns a capital-cased text
 * @param {string} str mixed case text
 * @returns {string}
 */
export function toCapitalizeCase(str) {
  if (typeof str !== 'string') return str;
  return str
    .trim()
    .split(/\s+/)
    .map(chunk => chunk[0].toUpperCase() + chunk.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Returns a formatted datetime
 * @param {string} datetime ISO8601 datetime
 * @returns {string}
 */
export function toDateFormat(datetime) {
  return DateTime.fromISO(datetime).toFormat('M/d/yyyy');
}

/**
 * Returns a formatted datetime
 * @param {string} datetime ISO8601 datetime
 * @returns {string}
 */
export function toDateTimeFormat(datetime) {
  return DateTime.fromISO(datetime).toFormat('M/dd/yyyy - H:mm a');
}

/**
 * Returns a formatted Secondary Relationship on Relationship type
 * @param {string}
 * @returns {string}
 */
export function toSecondaryRelationship(relationshipType) {
  return relationshipType ? relationshipType.split('/')[1] : '';
}

export function toPrimaryRelationship(relationshipType) {
  return relationshipType ? relationshipType.split('/')[0] : '';
}

/**
 * Trims the input string safely, returns empty string on null/undefined input
 * @param {string}
 * @returns {string}
 */
export function trimSafely(str) {
  return str ? str.trim() : '';
}

/**
 * Returns a formatted object to be passed in react-bootstrap-table
 * @param {object}
 * @returns {object}
 */
export function formatClient(client) {
  const { address } = client;
  const completeAddress = address || '';

  return {
    ...client,
    id: client.identifier,
    address: `${completeAddress.street_name} ${completeAddress.street_number}`,
    age: `${getAgeUtil(client.birth_dt).age}`,
    ageBirth: `${getAgeUtil(client.birth_dt).age} | ${client.birth_dt}`,
    city: completeAddress.city,
    name: `${client.common_first_name} ${client.common_last_name}`,
    phone: completeAddress.primary_phone,
    primaryRelationship: toPrimaryRelationship(client.relationship_type),
    secondaryRelationship: toSecondaryRelationship(client.relationship_type),
    birth_dt: toDateFormat(client.birth_dt),
  };
}

export function formatTable(ethnicities) {
  return !ethnicities
    ? []
    : [ethnicities].map(value => ({ otherEthnicity: value }));
}

export function getCardHeaderText({ XHRStatus, records }, text) {
  return XHRStatus === 'ready' && records
    ? `${text} (${records.length})`
    : text;
}

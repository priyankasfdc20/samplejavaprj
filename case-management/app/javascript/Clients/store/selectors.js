export const selectAlertRecords = state => {
  const alertsObject = state.fetchSafetyAlerts
    ? state.fetchSafetyAlerts.safetyAlerts
    : null;
  return alertsObject ? alertsObject.records : null;
};

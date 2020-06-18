import ApiService from '../api';

export const FEATURES = {
  dashboard_case_actions: 'dashboard_case_actions',
  dashboard_placement_tool: 'dashboard_placement_tool',
};

export class FeatureService {
  static fetch() {
    return ApiService.get('/features').then(response => response.data);
  }
}

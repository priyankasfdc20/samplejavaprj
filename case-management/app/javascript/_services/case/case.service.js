import ApiService from '../api';

class CaseService {
  static fetch(staffId) {
    return ApiService.get('/cases/' + staffId).then(response => response.data);
  }
}

export default CaseService;

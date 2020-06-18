import ApiService from '../api';

class StaffPersonService {
  static fetchCurrent() {
    return ApiService.get('/staff_persons/current').then(
      response => response.data
    );
  }
}

export default StaffPersonService;

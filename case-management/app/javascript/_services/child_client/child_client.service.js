import ApiService from '../api';

class ChildClientService {
  static fetch(id) {
    return ApiService.get(`/child_clients/${id}`).then(
      response => response.data
    );
  }

  static csec(id) {
    return ApiService.get(`/child_clients/${id}/csec`).then(
      response => response.data
    );
  }

  static indianAncestry(id) {
    return ApiService.get(
      `/child_clients/${id}/indian_ancestry_notifications`
    ).then(response => response.data);
  }
}

export default ChildClientService;

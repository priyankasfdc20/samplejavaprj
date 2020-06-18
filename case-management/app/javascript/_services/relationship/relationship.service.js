import ApiService from '../api';

class RelationshipService {
  static fetch(id) {
    return ApiService.get(`/relationships/${id}?token=null`).then(
      response => response.data
    );
  }

  static update(clientId, relationshipId, data) {
    return ApiService.put(
      `/clients/${clientId}/relationships/${relationshipId}`,
      data
    ).then(response => response.data);
  }
}

export default RelationshipService;

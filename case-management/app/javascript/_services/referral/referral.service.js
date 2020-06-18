import ApiService from '../api';
import { joinReceiveDateTime } from './transforms';

class ReferralService {
  static fetch(staffId) {
    return ApiService.get('/referrals/' + staffId)
      .then(response => response.data)
      .then(referrals => {
        return referrals.map(referral => joinReceiveDateTime(referral));
      });
  }
}

export default ReferralService;

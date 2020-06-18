export = ReferralService;
declare class ReferralService {
  static fetch(staffId): Promise<ReferralService.Referral[]>;
}
declare namespace ReferralService {
  export interface Referral {
    /**
     * ID - A system generated number used to uniquely identify each Referral. This ID has an internal 10 digit alpha-numeric and an external 19 digit numeric representation.
     */
    identifier: string;
    /**
     * NAME - The name which can be used for easy retrieval of a REFERRAL instead of the ID.
     */
    referral_name: string;
    /**
     * RECEIVED_DATE - The date the reported incident (REFERRAL) was received by a STAFF PERSON. This will be defaulted to the system date.
     */
    received_date: string;
    /**
     * RECEIVED_TIME - The time of day the reported incident (REFERRAL) was received by a STAFF PERSON. This will be defaulted to the system tim
     */
    received_time: LocalTime;
    /**
     * REFERRAL_RESPONSE_TYPE - The system generated number which identifies the first determined response (e.g., immediate, 10 days, etc.) assigned to the REFERRAL.
     */
    referral_response_type: string;
    /**
     * Assignment Identifier
     */
    assignment_identifier: string;
    /**
     * Assignment Type
     */
    assignment_type?: 'PRIMARY' | 'SECONDARY' | 'READ_ONLY';
  }
}

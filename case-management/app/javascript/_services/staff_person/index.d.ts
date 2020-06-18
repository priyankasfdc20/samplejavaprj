export = StaffPersonService;
declare class StaffPersonService {
  static fetchCurrent(): Promise<StaffPersonService.StaffPerson>;
}
declare namespace StaffPersonService {
  export interface StaffPerson {
    staff_id?: string;
    end_date?: string;
    first_name?: string;
    job_title?: string;
    last_name?: string;
    middle_initial?: string;
    name_prefix?: string;
    phone_number?: string;
    phone_ext?: string;
    start_date?: string;
    name_suffix?: string;
    telecommuter_indicator?: boolean;
    cws_office?: string;
    availability_and_location_description?: string;
    ssrs_licensing_worker_id?: string;
    county_code?: string;
    duty_worker_indicator?: boolean;
    cws_office_address?: string;
    email_address?: string;
  }
}

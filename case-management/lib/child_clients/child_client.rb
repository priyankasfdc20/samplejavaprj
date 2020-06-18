# frozen_string_literal: true

# rubocop:disable Metrics/ClassLength

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module ChildClients
  class ChildClient < Dry::Struct
    constructor_type :schema
    attribute :identifier, Types::String.optional
    attribute :adoption_status_code, Types::String.optional
    attribute :alien_registration_number, Types::String.optional
    attribute :birth_dt, Types::String.optional
    attribute :birth_facility_name, Types::String.optional
    attribute :birth_country_code, Types::Int.optional
    attribute :birth_state_code_type, Types::Int.optional
    attribute :child_client_ind_var, Types::String.optional
    attribute :common_first_name, Types::String.optional
    attribute :common_last_name, Types::String.optional
    attribute :common_middle_name, Types::String.optional
    attribute :confidentiality_in_effect_ind, Types::String.optional
    attribute :creation_date, Types::String.optional
    attribute :driver_license_number, Types::String.optional
    attribute :driver_license_state_code_type, Types::String.optional
    attribute :gender_code, Types::String.optional
    attribute :immigration_country_code_type, Types::String.optional
    attribute :immigration_status_type, Types::String.optional
    attribute :incapacitated_parent_code, Types::String.optional
    attribute :litrate_code, Types::String.optional
    attribute :marital_cohabitatn_indicator, Types::String.optional
    attribute :marital_status_type, Types::String.optional
    attribute :military_status_code, Types::String.optional
    attribute :name_prefix_description, Types::String.optional
    attribute :name_type, Types::String.optional
    attribute :outstanding_warrant_indicator, Types::String.optional
    attribute :primary_ethnicity_type, Types::Int.optional
    attribute :primary_race, Types::String.optional
    attribute :other_ethnicity_types, Types::Array.optional
    attribute :other_ethnicity, Types::Array.optional
    attribute :primary_language_type, Types::String.optional
    attribute :religion_type, Types::String.optional
    attribute :secondary_language_type, Types::String.optional
    attribute :sensivity_indicator, Types::String.optional
    attribute :sensivity_health_info_on_file_indicator, Types::String.optional
    attribute :social_security_number, Types::String.optional
    attribute :social_security_number_changed_code, Types::String.optional
    attribute :suffix_title_description, Types::String.optional
    attribute :unemployed_parent_code, Types::String.optional
    attribute :comment_description, Types::String.optional
    attribute :estimated_dob_code, Types::String.optional
    attribute :birthplace_verified_indicator, Types::String.optional
    attribute :hispanic_origin_code, Types::String.optional
    attribute :children_serv_indicator, Types::String.optional
    attribute :currently_regional_centeer_indicator, Types::String.optional
    attribute :currently_other_description, Types::String.optional
    attribute :previously_received_indicator, Types::String.optional
    attribute :previously_regional_center_indicator, Types::String.optional
    attribute :previously_other_description, Types::String.optional
    attribute :health_care_plan_indicator, Types::String.optional
    attribute :limitation_on_scphealth_indicator, Types::String.optional
    attribute :birth_city, Types::String.optional
    attribute :zippy_indicator, Types::String.optional
    attribute :tribal_member_verification_indicator, Types::String.optional
    attribute :tribal_ancestry_client_indicator, Types::String.optional
    attribute :soc158_ind, Types::String.optional
    attribute :death_date_verified_indicator, Types::String.optional
    attribute :soc158_placement_code, Types::String.optional
    attribute :ui_identifier, Types::String.optional
    attribute :victim_client_id, Types::String.optional
    attribute :adoptable_code, Types::String.optional
    attribute :adopted_age, Types::String.optional
    attribute :afdc_fc_eligibility_indicator_var, Types::String.optional
    attribute :all_education_info_on_file_indicator, Types::String.optional
    attribute :all_health_info_on_file_indicator, Types::String.optional
    attribute :attempt_to_acquire_educ_info_desc, Types::String.optional
    attribute :awol_abducted_code, Types::String.optional
    attribute :birth_history_indicator_var, Types::String.optional
    attribute :child_indian_ancestry_indicator, Types::String.optional
    attribute :current_case_id, Types::String.optional
    attribute :death_circumstances_type, Types::String.optional
    attribute :fc2_elig_application_indicator_var, Types::String.optional
    attribute :food_stamps_application_indicator, Types::String.optional
    attribute :icwa_eligibility_code, Types::String.optional
    attribute :intercountry_adopt_disrupted_indicator, Types::String.optional
    attribute :intercountry_adopt_dissolved_indicator, Types::String.optional
    attribute :med_eligibility_application_indicator_var, Types::String.optional
    attribute :minor_nmd_parent_indicator, Types::String.optional
    attribute :parental_rights_limited_indicator, Types::String.optional
    attribute :parental_rights_termintn_indicator_var, Types::String.optional
    attribute :paternity_individual_indicator_var, Types::String.optional
    attribute :previously_adopted, Types::String.optional
    attribute :safely_surrendered_babies_indicator_var, Types::String.optional
    attribute :saw1_elig_application_indicator_var, Types::String.optional
    attribute :saws_case_serial_number, Types::String.optional
    attribute :ssi_ssp_application_indicator, Types::String.optional
    attribute :tribal_ancestry_notifctn_indicator_var, Types::String.optional
    attribute :tribal_customary_adoption_indicator, Types::String.optional
    attribute :confidentiality_action_date, Types::String.optional
    attribute :death_date, Types::String.optional
    attribute :death_reason, Types::String.optional
    attribute :health_txt, Types::String.optional
    attribute :mother_parental_term_date, Types::String.optional
    attribute :father_parental_term_date, Types::String.optional
    attribute :death_place, Types::String.optional
    attribute :email_addr, Types::String.optional
    attribute :adjudicated_delinquent_indicator, Types::String.optional
    attribute :eth_unable_to_determin_code, Types::String.optional
    attribute :hisp_unable_to_determinate_reason_code, Types::String.optional
    attribute :sci_index_number, Types::String.optional
    attribute :db_version, Types::String.optional
    attribute :attempt_to_acquire_hlth_info_desc, Types::String.optional
    attribute :college_indicator, Types::String.optional
    attribute :disability_diagnosed_code, Types::String.optional
    attribute :drms_he_passport_doc_old, Types::String.optional
    attribute :drms_health_educ_passport_doc, Types::String.optional
    attribute :drms_voluntary_plcmnt_agrmnt_doc, Types::String.optional
    attribute :food_stamps_application_date, Types::String.optional
    attribute :postsec_voc_indicator, Types::String.optional
    attribute :sijs_scheduled_interview_date, Types::String.optional
    attribute :sii_next_screening_due_date, Types::String.optional
    attribute :tribal_customary_adoption_date, Types::String.optional
  end
end
# rubocop:enable Metrics/ClassLength

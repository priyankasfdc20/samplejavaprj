# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'

feature 'Landing Page' do
  scenario 'has some cases and referrals' do
    login
    page_has_caseworker_dashboard
    page_has_cases
    page_has_referrals
  end

  private

  def page_has_caseworker_dashboard
    expect(page).to have_content('Caseworker Dashboard')
  end

  def page_has_cases
    expect(page).to have_content('Cases')
  end

  def page_has_referrals
    expect(page).to have_content('Referrals')
  end
end

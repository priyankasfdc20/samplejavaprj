# frozen_string_literal: true

Rails.application.routes.draw do
  root 'dashboard#index'

  get 'clients/index'

  # TODO: How to glob empty also?
  get 'placement', to: 'placement#index'
  get 'placement/*args', to: 'placement#index'

  namespace :api, defaults: { format: 'json' } do
    get 'logout', to: 'logout#index'
    get 'account', to: 'account#index'
    get 'staff_persons/current'

    resources :features, only: [:index]

    resources :clients, only: [:show] do
      member do
        get :safety_alerts
      end
      member do
        put ':relationships/:relationship_id', to: 'clients#update_relationship'
      end

    end

    resources :child_clients, only: [:show] do
      member do
        get :csec
        get :indian_ancestry_notifications
      end
    end

    resources :cases, only: [:index] do
      collection do
        get ':user_id', to: 'cases#cases_by_user'
      end
    end

    resources :placements, only: [] do
      collection do
        get ':client_id', to: 'placements#clients_by_related_client_id'
      end
    end

    resources :relationships, only: [:show]

    resources :referrals, only: [:index] do
      collection do
        get ':user_id', to: 'referrals#referrals_by_user'
      end
    end
  end
end

# frozen_string_literal: true

Rails.application.routes.draw do
  root 'dashboard#show'

  resources :notes
end

# frozen_string_literal: true

Rails.application.routes.draw do
  root 'dashboard#show'

  resources :notes
  resources :publications

  resources :subscriptions do
    get :unsubscribe, on: :member
  end

  # telegram_webhook Telegram::WebhookController, :default
end

# frozen_string_literal: true

Rails.application.routes.draw do
  root 'dashboard#show'

  resources :notes
  resources :publications do
    delete :destroy_attachment, on: :member, path: 'files/:signed_id'
    post :add_attachment, on: :member
  end

  resources :subscriptions do
    get :unsubscribe, on: :member
  end

  # telegram_webhook Telegram::WebhookController, :default
end

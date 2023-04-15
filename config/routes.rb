# frozen_string_literal: true

Rails.application.routes.draw do
  root 'dashboard#show'

  resources :notes

  scope ':owner' do
    resources :tags, only: %i[create update] do
      get :edit, on: :collection
    end
  end

  resources :publications do
    delete :destroy_attachment, on: :member, path: 'files/:signed_id'
    post :upload_attachments, on: :member
  end

  resources :subscriptions do
    get :unsubscribe, on: :member
  end

  resources :projects

  # telegram_webhook Telegram::WebhookController, :default
end

# frozen_string_literal: true

Rails.application.routes.draw do
  default_url_options host: 'floki.net.ua', protocol: 'https'

  root 'dashboard#show'

  resources :notes
  resources :subscriptions do
    get :unsubscribe, on: :member
  end

  telegram_webhook Telegram::WebhookController, :default
end

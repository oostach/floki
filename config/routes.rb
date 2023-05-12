# frozen_string_literal: true

Rails.application.routes.draw do
  root 'dashboard#show'

  resources :notes
  resources :todos, only: [:index]
  get '/todos/:id', to: redirect('/todos')

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

  # GraphQL routes configuration
  if Rails.env.development? # rubocop:disable Style/IfUnlessModifier
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end
  post '/graphql', to: 'graphql#execute'

  # telegram_webhook Telegram::WebhookController, :default
end

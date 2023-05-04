# frozen_string_literal: true

module Types
  class TodoType < BaseObject
    description 'Single todo item'

    field :id, ID, null: false
    field :title, String, null: false
    field :status, Boolean, null: false
    field :due_date, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end

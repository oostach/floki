# frozen_string_literal: true

module Types
  class TodoType < BaseObject
    description 'Single todo item'

    field :id, ID, null: false
    field :title, String, null: false
    field :due_date, String
    field :completed, Boolean, null: false
    field :position, Int, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end

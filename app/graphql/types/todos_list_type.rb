# frozen_string_literal: true

module Types
  class TodosListType < BaseObject
    description 'Todos list object'

    field :id, ID, null: false
    field :name, String, null: false
    field :todos, [TodoType]
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end

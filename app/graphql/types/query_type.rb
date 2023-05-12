# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :lists, [TodosListType], null: false
    def lists
      TodosList.all
    end

    # Get a TodosList
    field :list, Types::TodosListType, null: false do
      argument :id, ID, required: true
    end
    def list(id:)
      TodosList.find(id)
    end

    field :todo, Types::TodoType, null: false do
      argument :id, ID, required: true
    end
    def todo(id:)
      Todo.find(id)
    end
  end
end

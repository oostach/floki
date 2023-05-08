# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :toggle_todo, mutation: Mutations::ToggleTodo
  end
end

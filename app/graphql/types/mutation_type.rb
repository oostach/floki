# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :toggle_todo, mutation: Mutations::ToggleTodo
    field :create_todo, mutation: Mutations::CreateTodo
  end
end

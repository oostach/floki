# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :toggle_todo, mutation: Mutations::Todos::Toggle
    field :create_todo, mutation: Mutations::Todos::Create
    field :delete_todo, mutation: Mutations::Todos::Delete
    field :update_todo, mutation: Mutations::Todos::Update
    field :update_position, mutation: Mutations::Todos::UpdatePosition
  end
end

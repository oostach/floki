# frozen_string_literal: true

module Mutations
  class ToggleTodo < BaseMutation
    argument :id, ID, required: true
    argument :status, Boolean, required: true

    field :todo, Types::TodoType, null: false

    def resolve(id:, status:)
      todo = Todo.find(id)
      { todo: todo } if todo.update(status: status)
    end
  end
end

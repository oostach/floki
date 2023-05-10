# frozen_string_literal: true

module Mutations
  class CreateTodo < BaseMutation
    argument :title, String, required: true
    argument :list_id, ID, required: true

    field :todo, Types::TodoType, null: false

    def resolve(title:, list_id:)
      todo_list = TodosList.find(list_id)
      todo = Todo.new(title: title, status: false, todos_list: todo_list)
      { todo: todo } if todo.save
    end
  end
end

# frozen_string_literal: true

module Mutations
  module Todos
    class UpdatePosition < BaseMutation
      argument :ids, [ID], required: true
      argument :list_id, ID, required: true

      field :todos, [Types::TodoType], null: false

      def resolve(ids:, list_id:)
        todo_list = TodosList.find(list_id)
        todo_list.todos.find(ids)
        todo_list.todos.each { |todo| todo.position = ids.index(todo.id.to_s) }
        { todos: todo_list.todos } if todo_list.save
      end
    end
  end
end

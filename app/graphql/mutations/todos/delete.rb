# frozen_string_literal: true

module Mutations
  module Todos
    class Delete < BaseMutation
      argument :id, ID, required: true
      argument :list_id, ID, required: true

      field :id, ID, null: false

      def resolve(id:, list_id:)
        todo_list = TodosList.find(list_id)
        todo = todo_list.todos.find(id)
        { id: todo.id } if todo.destroy
      end
    end
  end
end

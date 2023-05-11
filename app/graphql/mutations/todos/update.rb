# frozen_string_literal: true

module Mutations
  module Todos
    class Update < BaseMutation
      argument :id, ID, required: true
      argument :list_id, ID, required: true
      argument :title, String, required: true

      field :todo, Types::TodoType, null: false

      def resolve(id:, list_id:, title:)
        todo_list = TodosList.find(list_id)
        todo = todo_list.todos.find(id)
        { todo: todo } if todo.update(title: title)
      end
    end
  end
end

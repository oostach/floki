# frozen_string_literal: true

module Mutations
  module Todos
    class Create < BaseMutation
      argument :title, String, required: true
      argument :list_id, ID, required: true

      field :todo, Types::TodoType, null: false

      def resolve(title:, list_id:)
        todo_list = TodosList.includes(:todos).find(list_id)
        min_position = todo_list.todos.first&.position
        todo = todo_list.todos.new(title: title, status: false, position: min_position.to_i - 1)
        { todo: todo } if todo.save
      end
    end
  end
end

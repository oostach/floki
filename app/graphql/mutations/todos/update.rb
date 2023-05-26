# frozen_string_literal: true

module Mutations
  module Todos
    class Update < BaseMutation
      argument :id, ID, required: true
      argument :list_id, ID, required: true
      argument :title, String, required: true
      argument :date, String
      argument :time, String

      field :todo, Types::TodoType, null: false

      def resolve(id:, list_id:, title:, date:, time:)
        todo_list = TodosList.find(list_id)
        todo = todo_list.todos.find(id)
        { todo: todo } if todo.update(title: title, due_date: due_date(date, time))
      end

      def due_date(date, time)
        return unless date.present? && time.present?

        Time.zone.strptime([date.presence, time.presence].join, '%Y-%m-%d %H:%M')
      end
    end
  end
end

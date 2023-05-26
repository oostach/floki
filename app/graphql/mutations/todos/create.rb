# frozen_string_literal: true

module Mutations
  module Todos
    class Create < BaseMutation
      argument :title, String, required: true
      argument :date, String
      argument :time, String
      argument :list_id, ID, required: true

      field :todo, Types::TodoType, null: false

      def resolve(title:, date:, time:, list_id:)
        todo_list = TodosList.includes(:todos).find(list_id)
        min_position = todo_list.todos.first&.position
        todo = todo_list.todos.new(title: title, due_date: due_date(date, time), status: false, position: min_position.to_i - 1)
        { todo: todo } if todo.save
      end

      def due_date(date, time)
        return unless date.present? && time.present?

        Time.zone.strptime([date.presence, time.presence].join, '%Y-%m-%d %H:%M')
      end
    end
  end
end

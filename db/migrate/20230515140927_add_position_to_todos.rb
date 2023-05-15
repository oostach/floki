# frozen_string_literal: true

class AddPositionToTodos < ActiveRecord::Migration[7.0]
  def change
    add_column :todos, :position, :integer, after: :completed, default: 0
  end
end

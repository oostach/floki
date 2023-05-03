# frozen_string_literal: true

class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.string     :title, null: false
      t.datetime   :due_date
      t.boolean    :status, null: false, default: false
      t.references :todos_list, index: true, null: false, foreign_key: true

      t.timestamps
    end
  end
end

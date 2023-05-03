# frozen_string_literal: true

class CreateTodosLists < ActiveRecord::Migration[7.0]
  def change
    create_table :todos_lists do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end

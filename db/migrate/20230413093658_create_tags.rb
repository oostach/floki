# frozen_string_literal: true

class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.string :owner_class, index: true, limit: 82
      t.string :name, limit: 128, null: false

      t.timestamps
    end
  end
end

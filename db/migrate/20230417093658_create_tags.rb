# frozen_string_literal: true

class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.references :tag_mappings, foreign_key: true
      t.string :owner_class, index: true, limit: 82
      t.string :name, limit: 128, null: false

      t.timestamps
    end

    change_table :tag_mappings do |t|
      t.references :tags, foreign_key: true, null: false
    end
  end
end

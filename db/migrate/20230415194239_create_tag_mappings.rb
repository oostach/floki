# frozen_string_literal: true

class CreateTagMappings < ActiveRecord::Migration[7.0]
  def change
    create_table :tag_mappings do |t|
      t.references :taggable, polymorphic: true, null: false
      t.references :tag, foreign_key: true, null: false

      t.timestamps
    end
  end
end

# frozen_string_literal: true

class CreateRepositories < ActiveRecord::Migration[7.0]
  def change
    create_table :repositories do |t|
      t.references :project, index: true, null: false, foreign_key: true
      t.string :url, null: false
      t.string :name, null: false

      t.timestamps
    end
  end
end

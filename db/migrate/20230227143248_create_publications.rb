# frozen_string_literal: true

class CreatePublications < ActiveRecord::Migration[7.0]
  def change
    create_table :publications do |t|
      t.string :title
      t.string :url
      t.string :author

      t.timestamps
    end
  end
end

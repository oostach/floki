# frozen_string_literal: true

class CreateSubscription < ActiveRecord::Migration[7.0]
  def change
    create_table :subscriptions do |t|
      t.references :subscribable, polymorphic: true
      t.string :email, null: false
      t.string :unsubscribe_token, length: 64, null: false, uniq: true

      t.timestamps
    end
  end
end

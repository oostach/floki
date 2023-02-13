# frozen_string_literal: true

class CreateSubscription < ActiveRecord::Migration[7.0]
  def change
    create_table :subscriptions do |t|
      t.string :email, null: false
      t.string :notifiable_model, null: false
      t.string :actions, null: false, array: true
      t.string :unsubscribe_token, length: 64, null: false, uniq: true

      t.timestamps
    end
  end
end

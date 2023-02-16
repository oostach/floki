# frozen_string_literal: true

class Subscription < ApplicationRecord
  has_secure_token :unsubscribe_token

  validates :email, format: { with: /\A(.+)@(.+)\z/ },
                    length: { minimum: 6, maximum: 254 }

  def self.unsubscribe(token)
    find_by(unsubscribe_token: token).destroy
  end
end

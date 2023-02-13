# frozen_string_literal: true

class Subscription < ApplicationRecord
  has_secure_token :unsubscribe_token

  validates :email, format: { with: /\A(.+)@(.+)\z/, message: 'Email invalid' },
                    length: { minimum: 4, maximum: 254 }
end

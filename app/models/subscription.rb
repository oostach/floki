# frozen_string_literal: true

class Subscription < ApplicationRecord
  belongs_to :subscribable, polymorphic: true

  has_secure_token :unsubscribe_token
end

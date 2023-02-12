# frozen_string_literal: true

module Subscribable
  extend ActiveSupport::Concern

  included do
    has_many :subscribtions, as: :subscribable
  end
end

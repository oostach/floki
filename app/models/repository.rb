# frozen_string_literal: true

class Repository < ApplicationRecord
  belongs_to :project, inverse_of: :repository

  validates :name, :url, presence: true
end

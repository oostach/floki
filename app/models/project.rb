# frozen_string_literal: true

class Project < ApplicationRecord
  has_rich_text :description

  validates :title, :repository, presence: true
end

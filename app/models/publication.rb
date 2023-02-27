# frozen_string_literal: true

class Publication < ApplicationRecord
  has_rich_text :description
  has_many_attached :files
end

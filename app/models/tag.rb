# frozen_string_literal: true

class Tag < ApplicationRecord
  has_many :tag_mappings, inverse_of: :tag, dependent: :destroy

  validates :name, uniqueness: { scope: :owner_class }
end

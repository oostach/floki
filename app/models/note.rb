# frozen_string_literal: true

class Note < ApplicationRecord
  has_one_attached :image
end

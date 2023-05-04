# frozen_string_literal: true

class Todo < ApplicationRecord
  belongs_to :todos_list, inverse_of: :todos

  validates :title, presence: true
end

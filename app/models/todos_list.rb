# frozen_string_literal: true

class TodosList < ApplicationRecord
  has_many :todos, dependent: :destroy, inverse_of: :todos_list

  validates :name, presence: true
end

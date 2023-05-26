# frozen_string_literal: true

class Todo < ApplicationRecord
  belongs_to :todos_list, inverse_of: :todos

  default_scope -> { order(position: :asc) }

  validates :title, presence: true

  def date
    due_date&.to_date
  end

  def time
    due_date&.to_time
  end

  def completed
    status
  end
end

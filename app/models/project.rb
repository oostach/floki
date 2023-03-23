# frozen_string_literal: true

class Project < ApplicationRecord
  has_rich_text :description

  validates :title, :repository, presence: true

  default_scope { with_rich_text_description_and_embeds.order(created_at: :desc) }
end

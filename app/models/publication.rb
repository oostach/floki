# frozen_string_literal: true

class Publication < ApplicationRecord
  has_rich_text :description
  has_many_attached :files

  validates :title, :description, presence: true

  default_scope { with_rich_text_description_and_embeds.order(created_at: :desc) }
end

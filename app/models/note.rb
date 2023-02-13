# frozen_string_literal: true

class Note < ApplicationRecord
  include Notifiable

  has_rich_text :body
  has_one_attached :image

  default_scope { with_rich_text_body_and_embeds.order(created_at: :desc) }
end

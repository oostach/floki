# frozen_string_literal: true

class Note < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  include Notifiable

  mapping dynamic: false do
    indexes :title, type: :text
    indexes :body, type: :nested do
      indexes :to_plain_text, type: :text
    end
  end

  def as_indexed_json(options = {})
    as_json(
      include: {
        body: { methods: [:to_plain_text], only: [:to_plain_text] }
      }
    )
  end

  has_rich_text :body
  has_one_attached :image

  default_scope { with_rich_text_body_and_embeds.order(created_at: :desc) }

  validates :title, presence: true, length: { minimum: 5 }
end

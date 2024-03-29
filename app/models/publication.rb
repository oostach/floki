# frozen_string_literal: true

class Publication < ApplicationRecord
  include Taggable

  has_rich_text :description
  has_many_attached :files do |attachable|
    attachable.variant(:thumb, resize_to_fill: [300, 300])
  end

  validates :title, :description, presence: true

  default_scope { with_rich_text_description_and_embeds.order(created_at: :desc) }

  def partition_files
    files.partition { |file| file.content_type.match?('image') }
  end
end

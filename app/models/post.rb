# frozen_string_literal: true

class Post < ApplicationRecord
  has_rich_text :content

  validates :title, :author, :source_url, presence: true
end

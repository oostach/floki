# frozen_string_literal: true

class Post < ApplicationRecord
  has_rich_text :content

  validates :title, :author, :source_url, presence: true

  after_create_commit -> { broadcast_prepend_to 'dashboard_posts', partial: 'posts/post', locals: { post: self }, target: 'news-feed' }
end

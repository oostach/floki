# frozen_string_literal: true

class Project < ApplicationRecord
  has_rich_text :description
  has_one :repository, dependent: :destroy, inverse_of: :project

  attr_accessor :enable_repo

  validates :title, presence: true

  default_scope { with_rich_text_description_and_embeds.order(created_at: :desc) }

  def repo
    @repo ||= Octokit::Repository.from_url repository
  end
end

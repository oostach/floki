# frozen_string_literal: true

class Project < ApplicationRecord
  has_rich_text :description
  default_scope { with_rich_text_description_and_embeds.order(created_at: :desc) }

  attr_accessor :enable_repo

  validates :title, presence: true

  has_one :repository, dependent: :destroy, inverse_of: :project
  validates_associated :repository
  accepts_nested_attributes_for :repository

  def repo
    @repo ||= Octokit::Repository.from_url repository
  end
end

# frozen_string_literal: true

class Project < ApplicationRecord
  has_rich_text :description
  default_scope { with_rich_text_description_and_embeds.order(created_at: :desc) }

  attr_accessor :enable_repo

  validates :title, presence: true

  has_one :repository, dependent: :destroy, inverse_of: :project, validate: false
  validates_associated :repository, if: :repo_enabled?
  accepts_nested_attributes_for :repository

  def repo
    @repo ||= Octokit::Repository.from_url repository
  end

  def repo_enabled?
    enable_repo.present? && enable_repo == '1'
  end
end

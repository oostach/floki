# frozen_string_literal: true

class Project < ApplicationRecord
  has_rich_text :description
  default_scope { with_rich_text_description_and_embeds.order(created_at: :desc) }

  attr_accessor :enable_repo

  validates :title, presence: true

  has_one :repository, dependent: :destroy, inverse_of: :project, validate: false
  validates_associated :repository, if: :repo_enabled?
  accepts_nested_attributes_for :repository

  after_initialize :enable_repo!
  def enable_repo!
    self.enable_repo ||= repository.present?
  end

  after_update :remove_repository, if: -> { repo_disabled? && repository }
  def remove_repository
    return unless repository

    repository.destroy
  end

  def repo
    @repo ||= Octokit::Repository.from_url repository
  end

  def repo_enabled?
    enable_repo == '1'
  end

  def repo_disabled?
    !repo_enabled?
  end
end

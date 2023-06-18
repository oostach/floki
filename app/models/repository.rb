# frozen_string_literal: true

class Repository < ApplicationRecord
  belongs_to :project, inverse_of: :repository
  belongs_to :owner, class_name: 'Collaborator'
  has_many :collaborator_mappings, inverse_of: :repository, dependent: :destroy
  has_many :collaborators, through: :collaborator_mappings

  validates :name, :url, presence: true

  around_save :sync_data
  def sync_data
    will_sync = new_record? || changed.intersect?(%w[url])
    yield
    SyncRepositoryJob.perform_later id if will_sync
  end

  after_update_commit -> { broadcast_update_to 'projects_repositories', partial: 'projects/repository', locals: { repository: self }, target: ApplicationController.helpers.dom_id(project, :repository) }

  def repo_short_path
    url.gsub(%r{\Ahttps://github\.com/?}, '')
  end
end

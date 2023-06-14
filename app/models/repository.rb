# frozen_string_literal: true

class Repository < ApplicationRecord
  belongs_to :project, inverse_of: :repository

  validates :name, :url, presence: true

  around_save :sync_data
  def sync_data
    will_sync = new_record? || changed.intersect?(%w[name url])
    yield
    SyncRepositoryJob.perform_later id if will_sync
  end
end

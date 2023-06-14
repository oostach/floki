# frozen_string_literal: true

class SyncRepositoryJob < ApplicationJob
  queue_as :default

  def perform(id)
    repository = Repository.find(id)
  end
end

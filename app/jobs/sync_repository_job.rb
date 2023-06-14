# frozen_string_literal: true

class SyncRepositoryJob < ApplicationJob
  queue_as :default

  # rescue_from(ActiveRecord::RecordNotFound) do |exception|
  # end

  def perform(id)
    repository = Repository.find(id)
    repository.update(name: SecureRandom.alphanumeric(20))
  end
end

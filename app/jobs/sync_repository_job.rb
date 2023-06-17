# frozen_string_literal: true

class SyncRepositoryJob < ApplicationJob
  queue_as :default

  attr_reader :repository

  # rescue_from(ActiveRecord::RecordNotFound) do |exception|
  # end

  def perform(id)
    @repository = Repository.find(id)
    @repository.update(name: SecureRandom.alphanumeric(20))
  end

  private

  def client
    @client ||= Octokit::Client.new
  end

  def repo
    @repo ||= client.repo @repository.repo_short_path
  end
end

# frozen_string_literal: true

if Rails.env.development?
  require 'rack-mini-profiler'

  Rack::MiniProfiler.config.tap do |config|
    config.position = 'bottom-right'
  end

  # initialization is skipped so trigger it
  Rack::MiniProfilerRails.initialize!(Rails.application)
end

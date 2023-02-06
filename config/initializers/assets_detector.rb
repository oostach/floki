# frozen_string_literal: true

module AssetsDetector
  module_function

  def find_assets_source(filename)
    Rails.application.assets_manifest.find_sources(filename).first
  end

  def find_assets_path(filename)
    if Rails.application.assets
      Rails.application.assets.find_asset(filename)&.filename
    elsif Rails.application.assets_manifest
      asset = Rails.application.assets_manifest.assets[filename]
      Rails.public_path.join('assets', asset)
    end
  end
end

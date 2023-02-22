# frozen_string_literal: true

namespace :tailwindcss do # rubocop:disable Metrics/BlockLength
  desc 'Export precompiled tailwind stylesheets'
  task export: :environment do
    sprocket       = build_sprockets_env
    tailwind_asset = sprocket.find_asset('tailwind.css')
    public_path    = Rails.public_path.join('assets').to_s

    Sprockets::Exporters::FileExporter.new(asset: tailwind_asset, environment: sprocket, directory: public_path).call
    update_manifest(tailwind_asset)
  end

  def build_sprockets_env
    sprocket = Sprockets::Environment.new
    sprocket.append_path('app/assets/builds')
    sprocket
  end

  def update_manifest(asset)
    Rails.application.assets_manifest.files[asset.digest_path] = build_files_hash(asset)
    Rails.application.assets_manifest.assets[asset.logical_path] = asset.digest_path
    Rails.application.assets_manifest.save
  end

  def build_files_hash(asset)
    {
      'digest' => asset.hexdigest,
      'integrity' => Sprockets::DigestUtils.hexdigest_integrity_uri(asset.hexdigest),
      'logical_path' => asset.logical_path,
      'mtime' => Time.now.iso8601,
      'size' => asset.bytesize
    }
  end
end

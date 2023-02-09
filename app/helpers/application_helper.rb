# frozen_string_literal: true

module ApplicationHelper
  def svg_icon(name, path: nil, classes: '', options: {})
    svg_file = find_svg_file(name, path)

    body   = svg_file.to_s.force_encoding('UTF-8')
    doc    = Nokogiri::HTML::DocumentFragment.parse body
    svg    = doc.at_css 'svg'

    update_icon_attributes(svg, classes:, options:)
    raw doc # rubocop:disable Rails/OutputSafety
  end

  def update_icon_attributes(svg, classes:, options:)
    svg['class'] = classes
    options.each { |k, v| svg[k] = v }
  end

  def find_svg_file(name, path)
    svg_path      = path || 'icons/svg'
    svg_file_path = File.join(svg_path, "#{name}.svg")
    svg_file      = AssetsDetector.find_assets_source(svg_file_path)

    raise "Can't find #{svg_file_path}" unless svg_file

    svg_file
  end

  def delete_data_attr
    { turbo_method: :delete, turbo_confirm: 'Are you sure?' }
  end

  def update_flash_messages
    turbo_stream.replace 'flash-messages' do
      render 'layouts/flash'
    end
  end
end

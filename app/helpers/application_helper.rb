# frozen_string_literal: true

module ApplicationHelper
  class SvgNotFound < StandardError; end

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

    raise SvgNotFound, "Can't find #{svg_file_path}" unless svg_file

    svg_file
  end

  def update_flash_messages
    turbo_stream.replace 'flash-messages' do
      render 'layouts/flash'
    end
  end

  def file_type_icon(file, width: 18)
    ext = file.filename.extension_without_delimiter
    svg_icon ext, path: 'icons/svg/file-types', options: { width: "#{width}px" }
  rescue SvgNotFound => e
    Rails.logger.error e.message
    svg_icon :default, path: 'icons/svg/file-types', options: { width: "#{width}px" }
  end

  def png_file_type_icon(file, width: '16px')
    ext = file.filename.extension_without_delimiter
    image_tag "icons/png/file-types/#{ext}.png", class: 'file-icon-png', width: width
  end

  def page_title(&)
    tag.div(class: 'page-title') do
      concat(tag.h1(t('.page_title', default: controller_name.capitalize), class: 'page-title-text'))
      concat(capture_actions_content(&))
    end
  end

  def capture_actions_content(&block)
    return unless block_given?

    tag.div(class: 'page-title-actions') do
      block.call
    end
  end
end

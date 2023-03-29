# frozen_string_literal: true

class FlokiFormBuilder < ActionView::Helpers::FormBuilder
  DEFAULT_WRAPPER_CLASSES  = %w[form-group mb-2].freeze

  def text_field(method, options = {})
    build_field(method, __method__, options.reverse_merge(wrapper: false))
  end

  def inline_check_box(method, options = {})
    wrapper_classes = options.dig(:wrapper, :class).to_s.split | ['inline-checkbox']
    options[:wrapper] = (options[:wrapper] || {}).merge(class: wrapper_classes.join(' '))

    build_field(method, __method__, options.reverse_merge(wrapper: false))
  end

  def rich_text_area(method, options = {})
    build_field(method, __method__, options.reverse_merge(wrapper: false))
  end

  private

  def build_field(method, field_type, options)
    wrapper_options = options.delete(:wrapper) || {}
    field_builder   = "FlokiForm::#{field_type.to_s.classify}".constantize.new(@template, object, @object_name, method, options)

    if wrapper_options.is_a?(FalseClass)
      field_builder.without_wrapper.render
    else
      field_builder.wrapper_class = combine_wrapper_classes(wrapper_options[:class])
      field_builder.render
    end
  end

  def combine_wrapper_classes(classes)
    case classes
    when Array
      DEFAULT_WRAPPER_CLASSES + classes
    when String
      DEFAULT_WRAPPER_CLASSES + classes.split
    else
      DEFAULT_WRAPPER_CLASSES
    end.join(' ')
  end
end

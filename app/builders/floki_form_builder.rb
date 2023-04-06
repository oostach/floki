# frozen_string_literal: true

class FlokiFormBuilder < ActionView::Helpers::FormBuilder
  DEFAULT_WRAPPER_CLASSES = %w[form-group mb-2].freeze

  #
  # Wrapper around the standard FormBuilder text_field method. It creates a text field with label wrapped in a div with class "form-group".
  #
  # @param method [<Symbol>] object attribute we generate text field for.
  # @param options [<Hash>] a set of configuration options for the text_field and wrapper.
  # @option opts [<Boolean, Hash>] :wrapper accepts configuration hash for the wrapper or false to disable wrapping a field.
  #
  # @return [<String>] html template of the text field.
  #
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

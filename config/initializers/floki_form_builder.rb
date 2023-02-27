# frozen_string_literal: true

class FlokiFormBuilder < ActionView::Helpers::FormBuilder
  DEFAULT_WRAPPER_CLASSES = %w[form-group].freeze

  def text_field(method, options = {})
    build_field(method, __method__, options.reverse_merge(wrapper: false))
  end

  def rich_text_area(method, options = {})
    build_field(method, __method__, options.reverse_merge(wrapper: false))
  end

  private

  def build_field(method, field_type, options)
    wrapper_options = options.delete(:wrapper)
    if wrapper_options.is_a?(Hash) || wrapper_options.is_a?(TrueClass)
      field_with_wrapper(method, options, field_type, wrapper_options)
    else
      field_without_wrapper(method, options, field_type)
    end
  end

  def field_with_wrapper(method, options, field_type, wrapper_options)
    wrapper_class = combine_wrapper_classes(wrapper_options.delete(:class))

    @template.content_tag(:div, class: wrapper_class) do
      @template.label(@object_name, method, { class: ('required' if required?(method)) }) +
        @template.send(field_type, @object_name, method, options)
    end
  end

  def field_without_wrapper(method, options, field_type)
    @template.label(@object_name, method, { class: ('required' if required?(method)) }) + @template.send(field_type, @object_name, method, options)
  end

  def required?(method)
    object.class.validators_on(method).any? { |validation| validation.is_a?(ActiveModel::Validations::PresenceValidator) }
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

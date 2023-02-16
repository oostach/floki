# frozen_string_literal: true

class FlokiFormBuilder < ActionView::Helpers::FormBuilder
  DEFAULT_WRAPPER_CLASSES = %w[form-group].freeze

  def text_field(method, options = {}, wrapper_class: [])
    wrapper_class = combine_wrapper_classes(wrapper_class)

    @template.content_tag(:div, class: wrapper_class) do
      @template.label(@object_name, method) +
        @template.text_field(@object_name, method, options)
    end
  end

  private

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

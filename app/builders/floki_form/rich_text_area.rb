# frozen_string_literal: true

module FlokiForm
  class RichTextArea < Base
    RICHTEXT_WRAPPER_CLASSES = %w[form-richtext].freeze

    def skip_default_input_class?
      true
    end

    def template_with_wrapper
      template.content_tag(:div, class: wrapper_class) do
        template.label(object_name, method, { class: ('required' if required?) }) +
          template.content_tag(:div, class: RICHTEXT_WRAPPER_CLASSES) do
            template.rich_text_area(object_name, method, options)
          end
      end
    end

    def template_with_no_wrapper; end
  end
end

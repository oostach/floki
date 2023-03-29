# frozen_string_literal: true

module FlokiForm
  class InlineCheckBox < Base
    def template_with_wrapper
      template.content_tag(:div, class: wrapper_class) do
        template.check_box(object_name, method, options) +
          template.label(object_name, method, { class: ('required' if required?) })
      end
    end

    def template_with_no_wrapper; end
  end
end

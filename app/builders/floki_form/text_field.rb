# frozen_string_literal: true

module FlokiForm
  class TextField < Base
    def template_with_wrapper
      template.content_tag(:div, class: wrapper_class) do
        template.label(object_name, method, { class: ('required' if required?) }) +
          template.text_field(object_name, method, options)
      end
    end

    def template_with_no_wrapper
      template.label(object_name, method, { class: ('required' if required?) }) +
        template.check_box(object_name, method, options)
    end
  end
end

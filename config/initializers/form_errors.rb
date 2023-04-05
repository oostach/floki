# frozen_string_literal: true

ActionView::Base.field_error_proc = proc do |html_tag, instance|
  case html_tag
  when  /\A<label\s/
    html_tag
  when  /\A<input\s/
    method_name = instance.instance_variable_get('@method_name')
    FormErrorsWrapper.new(self, html_tag, instance.object, method_name).render
  else
    content_tag :div, html_tag, class: 'field-with-errors'
  end
end

class FormErrorsWrapper
  attr_reader :context, :object, :html_tag, :method_name

  def initialize(context, html_tag, object, method_name)
    @context     = context
    @html_tag    = html_tag
    @object      = object
    @method_name = method_name
  end

  def render
    context.content_tag :div, class: 'field-with-errors' do
      html_tag +
        context.content_tag(:span, object.errors.full_messages_for(method_name).join(', '), class: 'field-errors')
    end
  end
end

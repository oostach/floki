# frozen_string_literal: true

ActionView::Base.field_error_proc = proc do |html_tag, instance|
  case html_tag
  when  /\A<label\s/
    html_tag
  when  /\A<input\s/
    FormErrorsWrapper.new(self, html_tag, instance.object).render
  else
    content_tag :div, html_tag, class: 'field_with_errors'
  end
end

class FormErrorsWrapper
  attr_reader :context, :object, :html_tag

  def initialize(context, html_tag, object)
    @context  = context
    @html_tag = html_tag
    @object   = object
  end

  def render
    context.content_tag :div, class: 'field-with-errors' do
      html_tag +
        context.content_tag(:span, object.errors.full_messages_for(:title).join(', '), class: 'field-errors')
    end
  end
end

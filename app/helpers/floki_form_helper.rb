# frozen_string_literal: true

module FlokiFormHelper
  def floki_form_for(name, *args, &)
    options = args.extract_options!
    args << options.merge(builder: FlokiFormBuilder)
    form_for(name, *args, &)
  end

  def floki_form_with(model: nil, scope: nil, url: nil, format: nil, **options, &)
    options = options.reverse_merge(builder: FlokiFormBuilder)
    form_with(model: model, scope: scope, url: url, format: format, **options, &)
  end
end

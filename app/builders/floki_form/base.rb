# frozen_string_literal: true

module FlokiForm
  class Base
    DEFAULT_INPUT_CLASSES    = %w[form-input].freeze

    attr_reader :template, :object_name, :method, :options, :object
    attr_accessor :wrapper_class

    def initialize(template, object, object_name, method, options)
      @template                 = template
      @object                   = object
      @object_name              = object_name
      @method                   = method
      @options                  = options
      @without_wrapper          = false
    end

    def without_wrapper
      @without_wrapper = true
    end

    def without_wrapper?
      @without_wrapper
    end

    def skip_default_input_class?
      false
    end

    def render
      add_default_input_class unless skip_default_input_class?
      objectify_options
      without_wrapper? ? template_with_no_wrapper : template_with_wrapper
    end

    def add_default_input_class
      options[:class] = [options[:class], *DEFAULT_INPUT_CLASSES].join(' ')
    end

    def required?
      object.class.validators_on(method).any? { |validation| validation.is_a?(ActiveModel::Validations::PresenceValidator) }
    end

    def template_with_no_wrapper
      raise NotImplementedError, 'The method should be implemented in the parent class'
    end

    def template_with_wrapper
      raise NotImplementedError, 'The method should be implemented in the parent class'
    end

    def objectify_options
      options[:object] = object
    end
  end
end

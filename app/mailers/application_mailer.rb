# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'support@floki.net.ua'

  def self.inherited(subclass)
    super
    subclass.default template_path: "mailers/#{subclass.name.to_s.underscore}"
  end

  layout 'mailer'
end

# frozen_string_literal: true

class NotificationMailer < ApplicationMailer
  def note_create
    @note         = params[:note]
    @subscription = params[:subscription]

    mail(to: @subscription.email, subject: t('.create_subject'))
  end

  def note_destroy
    @note         = params[:note]
    @subscription = params[:subscription]

    mail(to: @subscription.email, subject: 'Note was removed')
  end

  def note_update
    @note         = params[:note]
    @subscription = params[:subscription]

    mail(to: @subscription.email, subject: 'Note was updated')
  end
end

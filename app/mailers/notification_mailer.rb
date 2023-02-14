# frozen_string_literal: true

class NotificationMailer < ApplicationMailer
  def note_create
    @note         = params[:note]
    @subscription = params[:subscription]

    mail(to: @subscription.email, subject: t('.create_subject', title: @note.title))
  end

  def note_destroy
    @note         = params[:note]
    @subscription = params[:subscription]

    mail(to: @subscription.email, subject: t('.destroy_subject', title: @note.title))
  end

  def note_update
    @note         = params[:note]
    @subscription = params[:subscription]

    mail(to: @subscription.email, subject: t('.update_subject', title: @note.title))
  end
end

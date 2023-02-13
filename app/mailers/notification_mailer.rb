# frozen_string_literal: true

class NotificationMailer < ApplicationMailer
  def note_create
    @note          = params[:note]
    @reciver_email = params[:reciver_email]

    mail(to: @reciver_email, subject: 'New note added')
  end

  def note_destroy
    @note          = params[:note]
    @reciver_email = params[:reciver_email]

    mail(to: @reciver_email, subject: 'New was removed')
  end
end

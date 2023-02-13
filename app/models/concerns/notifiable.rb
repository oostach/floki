# frozen_string_literal: true

module Notifiable
  extend ActiveSupport::Concern

  included do
    after_create :send_create_notifications
    after_update :send_update_notifications
    after_destroy :send_destroy_notifications
  end

  def send_create_notifications
    send_notification(:create)
  end

  def send_update_notifications
    send_notification(:update)
  end

  def send_destroy_notifications
    send_notification(:destroy)
  end

  private

  def send_notification(action)
    notifiable = model_name.name
    Subscription.where(notifiable_model: notifiable).where('actions @> ARRAY[?]::varchar[]', [action]).find_each do |subscribtion|
      NotificationMailer.with(note: self, to: subscribtion.email).send("#{notifiable.downcase}_#{action}").deliver_now
    end
  end
end

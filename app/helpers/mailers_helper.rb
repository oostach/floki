# frozen_string_literal: true

module MailersHelper
  def unsubscribe_link(subscription)
    link_to(t('unsubscribe', scope: 'mailers'), unsubscribe_subscription_url(subscription, token: subscription.unsubscribe_token))
  end
end

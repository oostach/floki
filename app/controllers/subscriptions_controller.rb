# frozen_string_literal: true

class SubscriptionsController < ApplicationController
  def new
    @subscription = Subscription.new(notifiable_model: params[:notifiable_model])
  end

  def create
    @subscription = Subscription.new(subscription_params.merge(actions: %i[create update destroy]))
    if @subscription.save
      flash[:autohide] = true
      flash.now.notice = t('subscription_added', scope: 'flashes.notice')
    else
      render action: :new
    end
  end

  def unsubscribe
    @subscription = Subscription.find_by(unsubscribe_token: params[:token])
    @subscription.destroy
  end

  private

  def subscription_params
    params.require(:subscription).permit(:email, :notifiable_model)
  end
end

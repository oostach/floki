# frozen_string_literal: true

class SubscriptionsController < ApplicationController
  def new
    @subscription = Subscription.new(notifiable_model: params[:notifiable_model])
  end

  def create
    @subscription = Subscription.new(subscription_params.merge(actions: %i[create update destroy]))
    if @subscription.save
      flash[:autohide] = true
      flash.now.notice = 'You email was added to notes subscription. You will be notified about any new notes.'
    else
      render action: :new
    end
  end

  private

  def subscription_params
    params.require(:subscription).permit(:email, :notifiable_model)
  end
end

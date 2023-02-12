# frozen_string_literal: true

class SubscriptionsController < ApplicationController
  def new
    @subscription = Subscription.new
  end

  def create; end
end

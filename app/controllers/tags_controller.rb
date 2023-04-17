# frozen_string_literal: true

class TagsController < ApplicationController
  before_action :load_owner

  def edit
    @tags = @owner.tags.list
  end

  private

  def load_owner
    @owner = GlobalID::Locator.locate params[:owner]
  end
end

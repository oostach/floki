# frozen_string_literal: true

class TagsController < ApplicationController
  before_action :load_owner

  def edit
    @tags = @owner.tags.list
  end

  def create
  end

  private

  def load_owner
    @owner = GlobalID::Locator.locate owner_param
  end

  def tags_params
    params.require(:tags).permit(:name, :owner)
  end

  def owner_param
    params[:owner] || tags_params[:owner]
  end
end

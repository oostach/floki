# frozen_string_literal: true

class TagsController < ApplicationController
  before_action :load_owner

  def edit
    @tags = @owner.tags.list
  end

  def create
    @tags = @owner.tags.update_list(tags_params[:name])
    @filter_tags = Tag.for_owner_class(@owner.class).uniq.map { |tag| [tag.id, tag.name] }
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

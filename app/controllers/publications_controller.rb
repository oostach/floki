# frozen_string_literal: true

class PublicationsController < ApplicationController
  def index
    @publications = Publication.all.with_rich_text_description_and_embeds
  end

  def new
    @publication = Publication.new
  end

  def create
    @publication = Publication.new(publication_params)

    if @publication.save
      flash.now.notice = 'Your publication has been successfully saved.'
      render action: :create
    else
      render action: :new
    end
  end

  private

  def publication_params
    params.require(:publication).permit(:title, :description, :url, :author, { files: [] })
  end
end

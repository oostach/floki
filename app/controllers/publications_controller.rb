# frozen_string_literal: true

class PublicationsController < ApplicationController
  PREPAGE = 5

  before_action :load_publication, only: %i[show edit destroy update]

  def index
    @publications = Publication.all
  end

  def show
    render @publication
  end

  def new
    @publication = Publication.new
  end

  def edit; end

  def create
    @publication = Publication.new(publication_params)

    if @publication.save
      flash.now.notice = 'Your publication has been successfully saved.'
      render action: :create
    else
      render action: :new
    end
  end

  def update
    if @publication.update(publication_params)
      render @publication
    else
      render action: :edit
    end
  end

  def destroy
    @publication.destroy
    flash.now.notice = 'Your note has been successfully removed.'
  end

  private

  def publication_params
    params.require(:publication).permit(:title, :description, :url, :author, files: [])
  end

  def load_publication
    @publication = Publication.find(params[:id])
  end
end

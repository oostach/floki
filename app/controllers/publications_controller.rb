# frozen_string_literal: true

class PublicationsController < ApplicationController
  include ActiveStorage::SetCurrent

  PREPAGE = 5

  before_action :load_publication, only: %i[show edit destroy update destroy_attachment add_attachment]

  def index
    @publications = Publication.with_attached_files.page(params[:page] || 1).per(PREPAGE)
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
    if @publication.update(publication_params.except(:files))
      @publication.files.attach(publication_params.delete(:files))
      render @publication
    else
      render action: :edit
    end
  end

  def destroy
    @publication.destroy
    flash.now.notice = 'Your note has been successfully removed.'
  end

  def add_attachment
    @publication.files.attach(publication_params.delete(:files))
    respond_to do |format|
      format.turbo_stream { turbo_stream.replace helpers.dom_id(@publication, 'resources'), partial: 'resources', locals: { publication: @publication } }
      # format.turbo_stream { turbo_stream.replace helpers.dom_id(@publication, 'resources'), partial: 'resources', locals: { publication: @publication } }
    end
  end

  def destroy_attachment
    @file = @publication.files.find_by(blob: ActiveStorage::Blob.find_signed(params[:signed_id]))
    @file.purge
  end

  private

  def publication_params
    params.require(:publication).permit(:title, :description, :url, :author, files: [])
  end

  def load_publication
    @publication = Publication.with_attached_files.find(params[:id])
  end
end

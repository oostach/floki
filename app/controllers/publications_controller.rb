# frozen_string_literal: true

class PublicationsController < ApplicationController
  include ActiveStorage::SetCurrent

  PREPAGE = 5

  before_action :load_publication, only: %i[show edit destroy update destroy_attachment upload_attachments]

  def index
    @publications = Publication.with_attached_files.page(params[:page] || 1).per(PREPAGE)
  end

  def show
    turbo_frame_request? ? render(@publication) : render(action: 'show')
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
    redirect_to(action: :index, status: :see_other) unless turbo_frame_request?
  end

  def upload_attachments
    @publication.files.attach(publication_params.delete(:files))
    @images, @files = @publication.files.last(publication_params[:files].size).partition { |file| file.content_type.match?('image') }
  end

  def destroy_attachment
    @file = @publication.files.find_by(blob: ActiveStorage::Blob.find_signed(params[:signed_id]))
    @file.purge
  end

  private

  def publication_params
    params.require(:publication).permit(:title, :description, :url, :author, files: [])
  end

  def params_publication_id
    params[:id]
  end

  def load_publication
    @publication = Publication.with_attached_files.find(params_publication_id) if params_publication_id
  end
end

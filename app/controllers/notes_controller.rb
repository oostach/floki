# frozen_string_literal: true

# TODO: Add rendering of the flash messages
class NotesController < ApplicationController
  include Searchable

  PREPAGE = 5

  before_action :load_note, only: %i[show edit destroy update]

  def index
    @notes = search_results.page(params[:page] || 1).per(PREPAGE)
  end

  def show
    render @note
  end

  def new
    @note = Note.new
  end

  def edit; end

  def create
    @note = Note.new(note_params)
    if @note.save
      flash[:autohide] = true
      flash.now.notice = 'Your note has been successfully saved.'
      render action: :create
    else
      render action: :new
    end
  end

  def update
    if @note.update(note_params)
      render @note
    else
      render action: :edit
    end
  end

  def destroy
    @note.destroy
    flash[:autohide] = true
    flash.now.notice = 'Your note has been successfully removed.'
  end

  private

  def search_scope
    Note.all
  end

  def note_params
    params.require(:note).permit(:title, :body)
  end

  def load_note
    @note = Note.find(params[:id])
  end
end

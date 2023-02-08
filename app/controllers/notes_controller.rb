# frozen_string_literal: true

# TODO: Add rendering of the flash messages
class NotesController < ApplicationController
  before_action :load_note, only: %i[show edit destroy update]
  def index
    @notes = Note.order(created_at: :desc).last(10)
  end

  def show
    render @note
  end

  def new
    @note = Note.new
  end

  def edit; end

  def create
    @note = Note.create!(note_params)
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
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end

  def load_note
    @note = Note.find(params[:id])
  end
end

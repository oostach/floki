# frozen_string_literal: true

class NotesController < ApplicationController
  def index
    @notes = Note.last(10)
  end

  def show
    @note = Note.find(params[:id])
    render @note
  end

  def new
    @note = Note.new
  end

  def edit
    @note = Note.find(params[:id])
  end

  def create
    @note = Note.create!(note_params)
  end

  def update
    @note = Note.find(params[:id])
    if @note.update(note_params)
      render @note
    else
      render action: :edit
    end
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end
end

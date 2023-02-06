# frozen_string_literal: true

class NotesController < ApplicationController
  def index
    @notes = Note.last(10)
  end

  def new
    @note = Note.new
  end

  def create
    @note = Note.create!(note_params)
  end

  def edit
    @note = Note.find(params[:id])
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end
end

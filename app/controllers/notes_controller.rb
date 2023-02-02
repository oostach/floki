# frozen_string_literal: true

class NotesController < ApplicationController
  def index
    @notes = Note.last(10)
  end

  def new
    @note = Note.new
  end

  def create
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end
end

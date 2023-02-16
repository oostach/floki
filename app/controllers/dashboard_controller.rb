# frozen_string_literal: true

class DashboardController < ApplicationController
  def show
    @posts = Post.all
  end
end

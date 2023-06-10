# frozen_string_literal: true

class ProjectsController < ApplicationController
  before_action :load_project, only: %i[destroy]

  def index
    @projects = Project.all
  end

  def new
    @project = Project.new
    @project.build_repository
  end

  def create
    @project = Project.new(project_params)

    if @project.save
      flash.now.notice = 'Your project has been successfully saved.'
    else
      render action: :new
    end
  end

  def destroy
    @project.destroy
    flash.now.notice = 'Your project has been successfully removed.'
    redirect_to(action: :index, status: :see_other) unless turbo_frame_request?
  end

  private

  def project_params
    params.require(:project).permit(:title, :description, :enable_repo, { repository_attributes: %i[url name] })
  end

  def load_project
    @project = Project.find(params[:id])
  end
end

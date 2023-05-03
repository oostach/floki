# frozen_string_literal: true

class ProjectsController < ApplicationController
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

  private

  def project_params
    params.require(:project).permit(:title, :description, :enable_repo, { repository_attributes: %i[url name] })
  end
end

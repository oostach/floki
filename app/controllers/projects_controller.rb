# frozen_string_literal: true

class ProjectsController < ApplicationController
  before_action :load_project, only: %i[edit show update destroy]

  def index
    @projects = Project.all
  end

  def show
    render @project
  end

  def new
    @project = Project.new
    @project.build_repository
  end

  def edit
    @project.repository || @project.build_repository
  end

  def create
    @project = Project.new(project_params)

    if @project.save
      flash.now.notice = t('project_created', scope: 'flashes.notice')
    else
      render action: :new
    end
  end

  def update
    if @project.update(project_params)
      render @project.reload
    else
      render action: :edit
    end
  end

  def destroy
    @project.destroy
    flash.now.notice = t('project_removed', scope: 'flashes.notice')
    redirect_to(action: :index, status: :see_other) unless turbo_frame_request?
  end

  private

  def project_params
    params.require(:project).permit(:title, :description, :enable_repo, { repository_attributes: %i[id url name] })
  end

  def load_project
    @project = Project.find(params[:id])
  end
end

# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Projects' do
  describe 'GET /index' do
    let(:projects) { create_list(:project, 3) }
    let(:first_project) { projects.first }
    let(:last_project) { projects.last }

    before do
      projects
      get projects_url
    end

    it 'renders a projects page' do
      expect(response).to be_successful
      expect(response).to render_template(:index)
    end

    it 'projects page contain a list of projects' do
      expect(response.body).to include(last_project.title)
      expect(first_project.description).not_to be_empty
      expect(response.body).to include(first_project.description.to_trix_html)
    end
  end

  describe 'GET /new' do
    before do
      get new_project_url
    end

    it 'renders a new project page' do
      expect(response).to be_successful
      expect(response).to render_template(:new)
    end

    it 'renders a project form on the page' do
      expect(assigns(:project)).to be_a_new(Project)
      expect(response.body).to include('Title')
      expect(response.body).to include('Description')
    end
  end
end

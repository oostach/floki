# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Main menu' do
  it 'have correct links' do
    visit '/'

    within 'ul.main-nav' do
      expect(page).to have_link('Project', href: projects_path)
      expect(page).to have_link('Books & Article', href: publications_path)
      expect(page).to have_link('Diary', href: notes_path)
    end
  end
end

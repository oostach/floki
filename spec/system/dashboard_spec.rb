# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Dashboard page' do
  it 'enables me to see dashboard' do
    visit '/'
    expect(page).to have_text('News Feed')
  end
end

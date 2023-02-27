# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Publication do
  it { is_expected.to have_db_column :title }
  it { is_expected.to have_db_column :url }
  it { is_expected.to have_db_column :author }
  it { is_expected.to have_rich_text :description }
  it { is_expected.to have_many_attached :files }
end

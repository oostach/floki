# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Project do
  it { is_expected.to have_db_column :title }
  it { is_expected.to have_rich_text :description }
  it { is_expected.to have_db_column :repository }

  describe 'validations' do
    subject { build(:project) }

    it { is_expected.to validate_presence_of :title }
    it { is_expected.to validate_presence_of :repository }
  end
end

# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Repository do
  it { is_expected.to have_db_column :url }
  it { is_expected.to have_db_column :name }
  it { is_expected.to belong_to :project }

  describe 'validations' do
    subject { build(:repository) }

    it { is_expected.to validate_presence_of :url }
    it { is_expected.to validate_presence_of :name }
  end
end

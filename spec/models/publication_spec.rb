# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Publication do
  it { is_expected.to have_db_column :title }
  it { is_expected.to have_db_column :url }
  it { is_expected.to have_db_column :author }
  it { is_expected.to have_rich_text :description }
  it { is_expected.to have_many_attached :files }

  describe 'validations' do
    subject { build(:publication) }

    it { is_expected.to validate_presence_of :title }
    it { is_expected.to validate_presence_of :description }
  end

  describe 'scope' do
    subject(:publications) { described_class.all }

    let(:dates) { [Time.zone.today - 2, Time.zone.today - 1, Time.zone.today] }

    before do
      dates.map { |date| create(:publication, created_at: date) }
    end

    it 'returns publications in descending order by default' do
      expect(publications.first.created_at).to eq(dates.last)
    end
  end
end

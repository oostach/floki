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

  describe '#partition_files' do
    subject(:files_partition) { publication.partition_files }

    let(:publication) { create(:publication, :with_many_attachments) }

    it 'pablication contain four files' do
      expect(publication.files.size).to eq(4)
    end

    it 'return the first array with images' do
      files_content_type = files_partition.first.map(&:content_type)
      expect(files_content_type).to contain_exactly 'image/png', 'image/jpeg'
    end

    it 'returns the second array with non-images file' do
      files_content_type = files_partition.last.map(&:content_type)
      expect(files_content_type).not_to include 'image/png'
      expect(files_content_type).to contain_exactly 'text/html', 'application/pdf'
    end
  end
end

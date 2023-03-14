# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Publications' do
  describe 'GET /upload_attachments' do
    let(:publication) { create(:publication) }
    let(:attachment_params) {
      {
        publication: { files: [Rack::Test::UploadedFile.new('spec/factories/attachments/simple.pdf')] },
        id: publication.id
      }
    }

    it 'add a attachment to' do
      expect {
        post upload_attachments_publication_url(publication), params: attachment_params
      }.to change(publication.files, :count).by(1)
    end
  end
end

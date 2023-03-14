# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Publications' do
  describe 'POST /upload_attachments' do
    let(:publication) { create(:publication) }
    let(:attachment_params) {
      {
        publication: { files: [Rack::Test::UploadedFile.new('spec/factories/attachments/simple.pdf')] },
        id: publication.id
      }
    }

    it 'add an attachment to' do
      expect {
        post upload_attachments_publication_url(publication), params: attachment_params, xhr: true
      }.to change(publication.files, :count).by(1)
      expect(response).to be_successful
      expect(response).to render_template(:upload_attachments)
    end
  end

  describe 'GET /index' do
    let(:publications) { create_list(:publication, 2) }
    let(:publications_with_attachment) { create_list(:publication, 3, :with_attachment) }
    let!(:first_publication) { publications.first }
    let!(:last_publication) { publications_with_attachment.last }

    before do
      get publications_url
    end

    it 'renders a page with a list of publications' do
      expect(response).to be_successful
      expect(response).to render_template(:index)
    end

    it 'renders a page with correct publications' do
      expect(response.body).to include(first_publication.title)
      expect(response.body).to include(last_publication.description.to_trix_html)
      expect(response.body).to include(last_publication.files.first.name)
    end
  end
end

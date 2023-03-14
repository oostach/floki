# frozen_string_literal: true

FactoryBot.define do
  factory :publication do
    title { Faker::Book.title }
    url { Faker::Internet.url }
    author { Faker::Book.author }
    description { Faker::Lorem.paragraph }

    trait :with_attachment do
      files { [Rack::Test::UploadedFile.new('spec/factories/attachments/simple.pdf')] }
    end

    trait :with_many_attachments do
      files do
        [
          Rack::Test::UploadedFile.new('spec/factories/attachments/simple.pdf'),
          Rack::Test::UploadedFile.new('spec/factories/attachments/simple.html'),
          Rack::Test::UploadedFile.new('spec/factories/attachments/simple.jpg'),
          Rack::Test::UploadedFile.new('spec/factories/attachments/simple.png')
        ]
      end
    end
  end
end

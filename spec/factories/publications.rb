# frozen_string_literal: true

FactoryBot.define do
  factory :publication do
    title { Faker::Book.title }
    url { Faker::Internet.url }
    author { Faker::Book.author }
    description { Faker::Book.description }

    trait :with_attachment do
      files { [fixture_file_upload('spec/factories/attachments/simple.pdf', 'application/pdf')] }
    end
  end
end

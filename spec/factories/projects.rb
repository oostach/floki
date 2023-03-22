# frozen_string_literal: true

FactoryBot.define do
  factory :project do
    title { Faker::App.name }
    description { Faker::Lorem.paragraph }
    repository { Faker::Internet.url }
  end
end

# frozen_string_literal: true

FactoryBot.define do
  factory :project do
    title { Faker::App.name }
    description { Faker::Lorem.paragraph }

    trait :with_repository do
      association :repository
    end
  end
end

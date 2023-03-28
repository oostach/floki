# frozen_string_literal: true

FactoryBot.define do
  factory :repository do
    url { Faker::Internet.url }
    name { Faker::App.name }
  end
end

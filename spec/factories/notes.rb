# frozen_string_literal: true

FactoryBot.define do
  factory :note do
    title { Faker::Lorem.sentence(word_count: 6, supplemental: false, random_words_to_add: 4) }
    body { Faker::Lorem.paragraph(sentence_count: 2, supplemental: true) }
  end
end

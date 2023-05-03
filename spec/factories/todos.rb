# frozen_string_literal: true

FactoryBot.define do
  factory :todo do
    title { 'MyString' }
    due_date { '2023-05-03 17:19:33' }
    state { 1 }
  end
end

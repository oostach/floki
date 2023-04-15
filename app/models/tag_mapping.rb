# frozen_string_literal: true

class TagMapping < ApplicationRecord
  belongs_to :taggable, polymorphic: true
  belongs_to :tag, inverse_of: :tag_mapping
end

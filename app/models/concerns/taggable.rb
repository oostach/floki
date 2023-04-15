# frozen_string_literal: true

class Taggable
  extend ActiveSupport::Concern

  included do
    has_many :tag_mappings, as: :taggable
    has_many :tags, , dependent: :destroy
  end
end

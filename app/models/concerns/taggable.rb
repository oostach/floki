# frozen_string_literal: true

module Taggable
  extend ActiveSupport::Concern

  included do
    has_many :tag_mappings, as: :taggable, dependent: :destroy
    has_many :tags, through: :tag_mappings do
      def update_list(list_of_tags)
        replace(find_or_create_tags(list_of_tags))
      end

      def find_or_create_tags(list_of_tags)
        tags_list = list_of_tags.split.uniq

        existing_tags = Tag.where(owner_class: owner_class, name: tags_list)
        new_tags      = (tags_list - existing_tags.map(&:name)).map { |name| Tag.create!(owner_class: owner_class, name: name) }
        existing_tags + new_tags
      end

      def owner_class
        proxy_association.owner.class.name
      end

      def list
        map(&:name).join(' ')
      end
    end

    scope :filter_by_tags, ->(tags) { tags.present? ? includes(tag_mappings: :tag).where(tags: { id: tags }) : includes(:tags) }

    accepts_nested_attributes_for :tags
  end
end

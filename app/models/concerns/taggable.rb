# frozen_string_literal: true

module Taggable
  extend ActiveSupport::Concern

  included do
    has_many :tag_mappings, as: :taggable, dependent: :destroy
    has_many :tags, through: :tag_mappings do
      def add(list)
        tags_list = list.split

        where(owner_class: owner_class, name: tags_list).then do |tags|
          tag_names = tags.map(&:name)
          self << (tags_list - tag_names).map { |name| Tag.new(owner_class: owner_class, name: name) }
        end
      end

      def owner_class
        proxy_association.owner.class.name
      end
    end
  end
end

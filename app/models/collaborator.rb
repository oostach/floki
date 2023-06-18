# frozen_string_literal: true

class Collaborator < ApplicationRecord
  has_many :collaborator_mappings, inverse_of: :repository, dependent: :destroy
  has_many :repositories, through: :collaborator_mappings
end

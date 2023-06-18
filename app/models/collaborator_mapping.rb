# frozen_string_literal: true

class CollaboratorMapping < ApplicationRecord
  belongs_to :collaborator, inverse_of: :collaborator_mapping
  belongs_to :repository, inverse_of: :collaborator_mapping
end

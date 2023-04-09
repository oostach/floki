# frozen_string_literal: true

class BlankSlateComponent < ViewComponent::Base
  include Turbo::FramesHelper

  attr_reader :image, :heading_text, :help_text, :actions

  delegate :tag, :capture, to: :helpers

  renders_one :actions

  def initialize(image, heading_text, help_text)
    @heading_text = heading_text
    @help_text    = help_text
    @image        = image
  end

  def help_text?
    help_text.present?
  end

  def actions?
    actions.present?
  end
end

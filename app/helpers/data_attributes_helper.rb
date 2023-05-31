# frozen_string_literal: true

module DataAttributesHelper
  def delete_data_attrs
    { turbo_method: :delete, turbo_confirm: 'Are you sure?' }
  end

  def droppable_data_attrs
    { action: 'dragover->droppable#highlightDroppableArea dragenter->droppable#highlightDroppableArea
               dragleave->droppable#clearDroppableArea drop->droppable#uploadOrPreviewFiles',
      droppable: { target: 'droppableArea' } }
  end

  def tooltip_data_attr(title:, placement: 'top')
    { controller: 'tooltip', action: 'mouseenter->tooltip#show mouseleave->tooltip#hide', tooltip_title_value: title, tooltip_placement_value: placement }
  end
end

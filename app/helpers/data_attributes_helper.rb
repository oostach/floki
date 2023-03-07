# frozen_string_literal: true

module DataAttributesHelper
  def delete_data_attrs
    { turbo_method: :delete, turbo_confirm: 'Are you sure?' }
  end

  def droppable_data_attrs
    { action: 'dragover->droppable#track dragenter->droppable#highlightDroppableArea dragleave->droppable#clearDroppableArea drop->droppable#loadFiles',
      droppable: { target: 'droppableArea' } }
  end
end

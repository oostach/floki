# frozen_string_literal: true

module Searchable
  extend ActiveSupport::Concern

  included do
    helper_method :search_params
  end

  def search_results
    @search_results ||= if search_params[:q]&.strip.present?
                          search_scope.search(query(search_params[:q].strip)).records
                        else
                          search_scope
                        end
  end

  private

  def search_params
    params.fetch(:search, {}).permit(:q)
  end

  def multi_match(query, object, fields = [])
    {
      multi_match: {
        query: query,
        fields: fields.map { |field| [object, field].compact.join('.') },
        minimum_should_match: '75%'
      }
    }
  end

  def nested_match(query, object, fields)
    {
      nested: {
        path: object,
        query: multi_match(query, object, fields)
      }
    }
  end

  def query(query, strength: :should)
    {
      query: {
        bool: {
          strength => [
            multi_match(query, nil, [:title]),
            nested_match(query, :body, [:to_plain_text])
          ]
        }
      }
    }.to_json
  end
end

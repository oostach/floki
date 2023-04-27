# frozen_string_literal: true

module Searchable
  extend ActiveSupport::Concern

  included do
    helper_method :search_params
  end

  def search_results
    @search_results ||= search_params[:q]&.strip.present? ? search_scope.search(search_params[:q].strip).records : search_scope
  end

  private

  def search_params
    params.fetch(:search, {}).permit(:q)
  end

  def query(search_phrase)
    {
      "query": {
        "bool": {
          "should": [
            {
              "match": {
                "title": search_phrase
              }
            },
            {
                "nested":{
                    "path": "body",
                    "query": {
                        "bool": {
                            "should": {
                                "match": {
                                    "body.to_plain_text": search_phrase
                                }
                            }
                        }
                    }
                }
            }
          ]
        }
      }
    }
  end
end

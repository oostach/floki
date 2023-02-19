# frozen_string_literal: true

module Telegram
  class WebhookController < Bot::UpdatesController
    # include Telegram::Bot::UpdatesController::Session
    # or just shortcut:
    use_session!

    # You can override global config for this controller.
    self.session_store = :redis_cache_store

    def write!(text = nil, *)
      session[:text] = text
    end

    def read!(*)
      respond_with :message, text: session[:text]
    end

    def start!(word = nil, *other_words)
      # do_smth_with(word)

      # full message object is also available via `payload` instance method:
      # process_raw_message(payload['text'])

      # There are `chat` & `from` shortcut methods.
      # For callback queries `chat` is taken from `message` when it's available.
      response = from ? "Hello #{from['username']}!" : 'Hi there!'

      # There is `respond_with` helper to set `chat_id` from received message:
      respond_with :message, text: response

      # `reply_with` also sets `reply_to_message_id`:
      reply_with :photo, photo: File.open('party.jpg')
    end

    private

    # In this case session will persist for user only in specific chat.
    # Same user in other chat will have different session.
    def session_key
      "#{bot.username}:#{chat['id']}:#{from['id']}" if chat && from
    end
  end
end

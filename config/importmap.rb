# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

pin 'application', preload: true
pin '@hotwired/turbo-rails', to: 'turbo.min.js', preload: true
pin 'flowbite', to: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.turbo.min.js'
pin 'flowbite-datepicker', to: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/datepicker.turbo.min.js'
pin 'trix'
pin '@rails/actiontext', to: 'actiontext.js'

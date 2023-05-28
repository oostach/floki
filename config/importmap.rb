# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap
pin 'application', preload: true
pin '@hotwired/turbo-rails', to: 'turbo.min.js', preload: true
pin 'flowbite', to: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.turbo.min.js'
pin 'flowbite-datepicker', to: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/datepicker.turbo.min.js'
pin 'trix'
pin '@rails/actiontext', to: 'actiontext.js'
pin '@hotwired/stimulus', to: 'stimulus.min.js', preload: true
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js', preload: true
pin '@rails/activestorage', to: 'activestorage.esm.js'
pin_all_from 'app/javascript/controllers', under: 'controllers'
pin '@octokit/core', to: 'https://ga.jspm.io/npm:@octokit/core@4.2.1/dist-web/index.js'
pin '@octokit/auth-token', to: 'https://ga.jspm.io/npm:@octokit/auth-token@3.0.3/dist-web/index.js'
pin '@octokit/endpoint', to: 'https://ga.jspm.io/npm:@octokit/endpoint@7.0.5/dist-web/index.js'
pin '@octokit/graphql', to: 'https://ga.jspm.io/npm:@octokit/graphql@5.0.6/dist-web/index.js'
pin '@octokit/request', to: 'https://ga.jspm.io/npm:@octokit/request@6.2.5/dist-web/index.js'
pin '@octokit/request-error', to: 'https://ga.jspm.io/npm:@octokit/request-error@3.0.3/dist-web/index.js'
pin 'before-after-hook', to: 'https://ga.jspm.io/npm:before-after-hook@2.2.3/index.js'
pin 'deprecation', to: 'https://ga.jspm.io/npm:deprecation@2.3.1/dist-node/index.js'
pin 'is-plain-object', to: 'https://ga.jspm.io/npm:is-plain-object@5.0.0/dist/is-plain-object.mjs'
pin 'node-fetch', to: 'https://ga.jspm.io/npm:node-fetch@2.6.11/browser.js'
pin 'once', to: 'https://ga.jspm.io/npm:once@1.4.0/once.js'
pin 'process', to: 'https://ga.jspm.io/npm:@jspm/core@2.0.1/nodelibs/browser/process-production.js'
pin 'universal-user-agent', to: 'https://ga.jspm.io/npm:universal-user-agent@6.0.0/dist-node/index.js'
pin 'wrappy', to: 'https://ga.jspm.io/npm:wrappy@1.0.2/wrappy.js'

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

pin "octokit", to: "https://ga.jspm.io/npm:octokit@2.0.14/dist-web/index.js"
pin "@octokit/app", to: "https://ga.jspm.io/npm:@octokit/app@13.1.2/dist-node/index.js"
pin "@octokit/auth-app", to: "https://ga.jspm.io/npm:@octokit/auth-app@4.0.9/dist-web/index.js"
pin "@octokit/auth-oauth-app", to: "https://ga.jspm.io/npm:@octokit/auth-oauth-app@5.0.5/dist-web/index.js"
pin "@octokit/auth-oauth-device", to: "https://ga.jspm.io/npm:@octokit/auth-oauth-device@4.0.4/dist-web/index.js"
pin "@octokit/auth-oauth-user", to: "https://ga.jspm.io/npm:@octokit/auth-oauth-user@2.1.1/dist-web/index.js"
pin "@octokit/auth-token", to: "https://ga.jspm.io/npm:@octokit/auth-token@3.0.2/dist-web/index.js"
pin "@octokit/auth-unauthenticated", to: "https://ga.jspm.io/npm:@octokit/auth-unauthenticated@3.0.4/dist-web/index.js"
pin "@octokit/core", to: "https://ga.jspm.io/npm:@octokit/core@4.2.0/dist-web/index.js"
pin "@octokit/endpoint", to: "https://ga.jspm.io/npm:@octokit/endpoint@7.0.5/dist-web/index.js"
pin "@octokit/graphql", to: "https://ga.jspm.io/npm:@octokit/graphql@5.0.5/dist-web/index.js"
pin "@octokit/oauth-app", to: "https://ga.jspm.io/npm:@octokit/oauth-app@4.2.0/dist-node/index.js"
pin "@octokit/oauth-authorization-url", to: "https://ga.jspm.io/npm:@octokit/oauth-authorization-url@5.0.0/dist-web/index.js"
pin "@octokit/oauth-methods", to: "https://ga.jspm.io/npm:@octokit/oauth-methods@2.0.5/dist-node/index.js"
pin "@octokit/plugin-paginate-rest", to: "https://ga.jspm.io/npm:@octokit/plugin-paginate-rest@6.0.0/dist-web/index.js"
pin "@octokit/plugin-rest-endpoint-methods", to: "https://ga.jspm.io/npm:@octokit/plugin-rest-endpoint-methods@7.0.1/dist-web/index.js"
pin "@octokit/plugin-retry", to: "https://ga.jspm.io/npm:@octokit/plugin-retry@4.1.3/dist-web/index.js"
pin "@octokit/plugin-throttling", to: "https://ga.jspm.io/npm:@octokit/plugin-throttling@5.0.1/dist-web/index.js"
pin "@octokit/request", to: "https://ga.jspm.io/npm:@octokit/request@6.2.3/dist-web/index.js"
pin "@octokit/request-error", to: "https://ga.jspm.io/npm:@octokit/request-error@3.0.3/dist-web/index.js"
pin "@octokit/webhooks", to: "https://ga.jspm.io/npm:@octokit/webhooks@10.7.0/dist-web/index.js"
pin "@octokit/webhooks-methods", to: "https://ga.jspm.io/npm:@octokit/webhooks-methods@3.0.2/dist-web/index.js"
pin "aggregate-error", to: "https://ga.jspm.io/npm:aggregate-error@3.1.0/index.js"
pin "before-after-hook", to: "https://ga.jspm.io/npm:before-after-hook@2.2.3/index.js"
pin "bottleneck/light", to: "https://ga.jspm.io/npm:bottleneck@2.19.5/light.js"
pin "btoa-lite", to: "https://ga.jspm.io/npm:btoa-lite@1.0.0/btoa-browser.js"
pin "buffer", to: "https://ga.jspm.io/npm:@jspm/core@2.0.1/nodelibs/browser/buffer.js"
pin "clean-stack", to: "https://ga.jspm.io/npm:clean-stack@2.2.0/index.js"
pin "deprecation", to: "https://ga.jspm.io/npm:deprecation@2.3.1/dist-node/index.js"
pin "fromentries", to: "https://ga.jspm.io/npm:fromentries@1.3.2/index.js"
pin "indent-string", to: "https://ga.jspm.io/npm:indent-string@4.0.0/index.js"
pin "is-plain-object", to: "https://ga.jspm.io/npm:is-plain-object@5.0.0/dist/is-plain-object.mjs"
pin "lru-cache", to: "https://ga.jspm.io/npm:lru-cache@6.0.0/index.js"
pin "node-fetch", to: "https://ga.jspm.io/npm:node-fetch@2.6.9/browser.js"
pin "once", to: "https://ga.jspm.io/npm:once@1.4.0/once.js"
pin "os", to: "https://ga.jspm.io/npm:@jspm/core@2.0.1/nodelibs/browser/os.js"
pin "process", to: "https://ga.jspm.io/npm:@jspm/core@2.0.1/nodelibs/browser/process-production.js"
pin "universal-github-app-jwt", to: "https://ga.jspm.io/npm:universal-github-app-jwt@1.1.1/dist-web/index.bundled.js"
pin "universal-user-agent", to: "https://ga.jspm.io/npm:universal-user-agent@6.0.0/dist-node/index.js"
pin "wrappy", to: "https://ga.jspm.io/npm:wrappy@1.0.2/wrappy.js"
pin "yallist", to: "https://ga.jspm.io/npm:yallist@4.0.0/yallist.js"

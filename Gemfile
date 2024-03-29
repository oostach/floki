source 'https://rubygems.org'
git_source(:github) { |repo| 'https://github.com/#{repo}.git' }

ruby '3.2.0'

gem 'rails', '~> 7.0.4', '>= 7.0.4.3'
gem 'sprockets-rails'
gem 'pg', '~> 1.1'
gem 'puma', '~> 5.0'
gem 'importmap-rails'
gem 'turbo-rails'
gem 'stimulus-rails'
gem 'jbuilder'
gem 'redis', '~> 4.0'
gem 'haml-rails'
gem 'kaminari'
gem "view_component", "~> 2.82"
# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem 'kredis'

gem 'bcrypt', '~> 3.1.7'
gem 'tzinfo-data', platforms: %i[ mingw mswin x64_mingw jruby ]
gem 'bootsnap', require: false
gem 'sassc-rails'
gem 'image_processing', '~> 1.2'
gem "graphql"
gem 'octokit'
gem 'faraday-retry'
gem 'elasticsearch-model', git: 'https://github.com/elastic/elasticsearch-rails', branch: 'main'
gem 'elasticsearch-rails', git: 'https://github.com/elastic/elasticsearch-rails', branch: 'main'
gem 'floki-form', '~> 0.2', git: 'https://github.com/oostach/floki-form'
# gem 'floki-form', '~> 0.2', path: '~/projects/floki-form'

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug'
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'letter_opener'
end

group :development do
  gem 'solargraph'
  gem 'web-console'
  gem 'rack-mini-profiler', require: false
  gem 'rubocop-rails'
  gem 'rubocop-rspec'
  gem 'haml_lint', require: false
  gem "graphiql-rails"
  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem 'spring'
end

group :test do
  gem 'shoulda-matchers'
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'rails-controller-testing'
end

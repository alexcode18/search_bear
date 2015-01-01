Setting up RSpec-Rails:

## Delete Test Folder

RSpec uses a folder called `spec`, so if you have a `test` folder, confirm there
are no tests written in there, and then delete it.

## Add Rspec to Gemfile

Add the `rspec-rails` gem to your project, which the RSpec gem, as well as some
rails-specific extensions.

```ruby
group :development do
  gem 'rspec-rails'
  gem 'rspec-collection_matchers'
  gem 'shoulda-matchers', require: false
end
```

Once you have saved your Gemfile, run `bundle install` as always.

## Setup Test Database

Run the following commands to ensure your test database is set up:

```
rake db:create
rake db:migrate
```

## Install RSpec

Run the command below to install RSpec into your app:

```
rails generate rspec:install
```

Edit `.rspec` to include the following line:

```
--format documentation
```

and to remove the `--warnings` line.

Edit `rails_helper.rb` to include the following after the other `require`
statements

```ruby
require 'rspec/collection_matchers'
require 'shoulda/matchers'
```


## Confirm RSpec Installation

Run `rspec` on the command line to confirm everything is set up properly. You
should see something like:

```
$ rspec
No examples found.

Finished in 0.00019 seconds (files took 0.05607 seconds to load)
0 examples, 0 failures
```

## Create Specs

Create `spec/models` if need be, and then create spec files in that folder for
your models.

For a User model, you might have the following in `spec/models/user_spec.rb`:

```ruby
require 'rails_helper' # note we require rails_helper here, NOT spec_helper

# normal RSpec Stuff
describe User do
  let(:hari) { User.new( username: "superman",
                         first_name: "Hari",
                         password: "hunter2",
                         password_confirmation: "hunter2")}

  it "is valid with a username, email, and password" do
    expect(hari).to be_valid
  end
end
```

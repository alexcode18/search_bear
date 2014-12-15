# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'ffaker'

Person.delete_all

(1..10).each do

	user = User.new
	user.parent_email = Faker::Internet.email()
	user.child_name = Faker::Name.first_name()
	user.gender = ["M", "F"].sample
	
	
end
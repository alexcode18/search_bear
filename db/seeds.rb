# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'ffaker'

User.delete_all
Bear.delete_all


i = 0

while i < 20 do

	user = User.new()
	user.parent_email = Faker::Internet.email()
	user.password = "happy"
	user.password_confirmation = "happy"
	user.child_name = Faker::Name.first_name()
	user.child_gender = ["M", "F"].sample
	user.favorite_color = ["red", "yellow", "green", "blue"].sample
	user.save()

	bear = Bear.new()
	bear.name = Faker::Name.first_name()
	bear.gender = ["M", "F"].sample
	bear.hunger = 100
	bear.happiness = 100
	bear.energy = 100
	bear.user_id = i
	bear.save()

	i += 1
end
require 'rails_helper'

describe Bear do

	it { is_expected.to validate_presence_of :name }
	it { is_expected.to validate_presence_of :gender }
	it { is_expected.to validate_presence_of :hunger }
	it { is_expected.to validate_presence_of :happiness }
	it { is_expected.to validate_presence_of :energy }
	it { is_expected.to validate_presence_of :user_id }

	let(:bubbles) { Bear.new( name: "Bubbles",
														gender: "F",
														hunger: 100,
														happiness: 100,
														energy: 100,
														user_id: 2)}
	
	it "is valid if there is a name, gender, hunger, happiness, and energy" do
		expect(bubbles).to be_valid
	end

	it "is invalid without a name" do
		new_bear = Bear.new(name: nil)
		errors = new_bear.errors_on(:name)
		expect(errors.count).to eq(1)
		expect(new_bear).to have(1).errors_on(:name)
	end

	it "is invalid if hunger value isn't numeric" do
		new_bear = Bear.new( 	name: "Bubbles",
													gender: "F",
													hunger: "fun",
													happiness: 100,
													energy: 100,
													user_id: 2)
		errors = new_bear.errors_on(:hunger)
		expect(errors.count).to eq(1)
		errors_included = errors.include?("is not a number")
		expect(errors_included).to eq(true)
	end

	it "is invalid if happiness value isn't numeric" do
		new_bear = Bear.new( 	name: "Bubbles",
													gender: "F",
													hunger: 100,
													happiness: "fun",
													energy: 100,
													user_id: 2)
		errors = new_bear.errors_on(:happiness)
		expect(errors.count).to eq(1)
		errors_included = errors.include?("is not a number")
		expect(errors_included).to eq(true)
	end

	it "is invalid if energy value isn't numeric" do
		new_bear = Bear.new( 	name: "Bubbles",
													gender: "F",
													hunger: 100,
													happiness: 100,
													energy: "fun",
													user_id: 2)
		errors = new_bear.errors_on(:energy)
		expect(errors.count).to eq(1)
		errors_included = errors.include?("is not a number")
		expect(errors_included).to eq(true)
	end
end
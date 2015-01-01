require 'rails_helper'

describe User do

	it { is_expected.to validate_presence_of :parent_email }
	it { is_expected.to validate_presence_of :child_name }
	it { is_expected.to validate_presence_of :favorite_color}

	let(:billy) { User.new( parent_email: "happy@me.com",
													password: "happy",
													password_confirmation: "happy",
													child_name: "Sonny",
													child_gender: "M",
													favorite_color: "blue")}
	
	it "is valid if there is a parent email, confirmed password, child name, child gender, and favorite color" do
		expect(billy).to be_valid
	end

	it "is valid without a child gender" do
		new_user = User.new( parent_email: "happy@me.com",
													password: "happy",
													password_confirmation: "happy",
													child_name: "Sonny",
													child_gender: "",
													favorite_color: "blue")

		expect(new_user).to be_valid
	end

	it "is invalid without a parent_email" do
		new_user = User.new(parent_email: nil)
		errors = new_user.errors_on(:parent_email)
		expect(errors.count).to eq(1)

		expect(new_user).to have(1).errors_on(:parent_email)
	end

	it "is invalid without matching password and password_confirmation" do
		new_user = User.new( parent_email: "happy@me.com",
													password: "happy",
													password_confirmation: "hoop",
													child_name: "Sonny",
													child_gender: "M",
													favorite_color: "blue")

		errors = new_user.errors_on(:password_confirmation)
		errors_included = errors.include?("doesn't match Password")
		expect(errors_included).to eq(true)
	end

	it "must have a password and password_confirmation" do
		new_user = User.new( parent_email: "happy@me.com",
													password: "happy",
													password_confirmation: "happy",
													child_name: "Sonny",
													child_gender: "M",
													favorite_color: "blue")

		errors = new_user.errors_on(:password_confirmation)
		errors_included = errors.include?("doesn't match Password")
		expect(errors_included).to eq(false)
	end

end
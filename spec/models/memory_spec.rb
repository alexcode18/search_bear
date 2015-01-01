require 'rails_helper'

describe Memory do

	it { is_expected.to validate_presence_of :bear_id }
	it { is_expected.to validate_presence_of :keyword }
	it { is_expected.to validate_presence_of :image_url }
	
	let(:this_memory) { Memory.new( bear_id: 2,
																	keyword: "happy",
																	image_url: "http://t3.gstatic.com/images?q=tbn:ANd9GcSXp2R-logR64oBGWAayxWhDlfGr7T6wXObBW3tgPVSua8Pnot7")}

	it "is valid if there is a bear_id, keyword, and image_url" do
		expect(this_memory).to be_valid
	end

	it "is invalid without a bear_id" do
		new_memory = Memory.new(bear_id: nil)
		errors = new_memory.errors_on(:bear_id)
		expect(errors.count).to eq(1)
		expect(new_memory).to have(1).errors_on(:bear_id)
	end

	it "is invalid without a keyword" do
		new_memory = Memory.new(keyword: nil)
		errors = new_memory.errors_on(:keyword)
		expect(errors.count).to eq(1)
		expect(new_memory).to have(1).errors_on(:keyword)
	end

	it "is invalid without am image_url" do
		new_memory = Memory.new(image_url: nil)
		errors = new_memory.errors_on(:image_url)
		expect(errors.count).to eq(1)
		expect(new_memory).to have(1).errors_on(:image_url)
	end
end
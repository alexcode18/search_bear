class Bear < ActiveRecord::Base
	has_one :memory
	belongs_to :user

	validates_presence_of :gender,:hunger, :happiness, :energy
end
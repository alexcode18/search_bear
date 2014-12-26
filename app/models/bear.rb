class Bear < ActiveRecord::Base
	has_many :memories, dependent: :destroy
	belongs_to :user

	validates_presence_of :name, :gender, :hunger, :happiness, :energy
end
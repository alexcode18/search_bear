class Search < ActiveRecord::Base
	belongs_to :user
	has_many :memories,  dependent: :destroy
	validates_presence_of :user_id, :keyword
end
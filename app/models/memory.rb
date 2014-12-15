class Memory < ActiveRecord::Base
	belongs_to :bear

	validates_presence_of :bear_id, :all
end
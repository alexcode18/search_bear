class Memory < ActiveRecord::Base
	belongs_to :bear
	belongs_to :search
	validates_presence_of :bear_id, :keyword, :image_url
end
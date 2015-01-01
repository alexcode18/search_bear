class User < ActiveRecord::Base
	has_many :bears,  dependent: :destroy
	has_many :searches, dependent: :destroy
	
	validates_presence_of :parent_email, :child_name, :favorite_color
	validates_uniqueness_of :parent_email
	has_secure_password
end
class UsersController < ApplicationController

	before_action :authenticate

	def index
		@users = User.all
	end

	def show
		@user = User.find(params[:id])
	end

	private

	def user_params
		params.require(:user).permit(:parent_email, :password, :child_name, :favorite_color)
	end
end
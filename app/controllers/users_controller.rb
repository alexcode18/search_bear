class UsersController < ApplicationController

	before_action :authenticate

	def index
		@users = User.all
		render json: @users
	end

	def show
		@user = User.find(params[:id])
		render json: @user
	end

	def create
    @user = User.new()
		@user.parent_email = params[:parent_email]
		@user.password = params[:password]
		@user.password_confirmation = params[:password_confirmation]
		@user.child_name = params[:child_name]
		@user.child_gender = params[:child_gender]
		@user.favorite_color = params[:favorite_color]

    if @user.save
      session[:current_user] = @user.id
      render json: @user
    else
    	render json: @user.errors
    end
  end

	private

	def user_params
		params.require(:user).permit(:parent_email, :password, :password_confirmation, :child_name, :child_gender, :favorite_color)
	end
end
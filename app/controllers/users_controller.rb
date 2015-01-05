class UsersController < ApplicationController

	before_action :authenticate, except: [:create ]

	def index
		@users = User.all
		render json: @users
	end

	def show
		@user = User.find(params[:id])
		if current_user && @user == current_user
			render json: @user
		# else
		# 	render json: { errors: ["You are not authorized to see that note"] }, status: 401
		end
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
    end
  end

  def update
  	@user = User.find(params[:id])
  	@user.parent_email = params[:parent_email]

  	if (params[:password] != nil) && (params[:password] === params[:password_confirmation])
			@user.password = params[:password]
			@user.password_confirmation = params[:password_confirmation]
		end

		@user.child_name = params[:child_name]
		@user.child_gender = params[:child_gender]
		@user.favorite_color = params[:favorite_color]
  	if @user.save()
  		render json: @user
  	else
			render json: { errors: @user.errors.full_messages }, status: 422
		end
	end

	def delete
		@user = User.find(params[:id])
    @user.destroy
    session[:current_user] = nil if @user == current_user
    redirect_to new_user_path
	end

	private

	def user_params
		params.require(:user).permit(:parent_email, :password, :password_confirmation, :child_name, :child_gender, :favorite_color)
	end
end
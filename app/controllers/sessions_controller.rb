class SessionsController < ApplicationController

	def new
	end

	def create
		user = User.find_by(parent_email: params[:parent_email])
		if user && user.authenticate(params[:password])
			session[:current_user_id] = user.id
			render json: user.to_json(include: [{:bears => {:include => :memories}}, :searches])
		else
			redirect_to root_path
		end
	end

	def destroy
		session[:current_user_id] = nil
		redirect to root_path
	end

end
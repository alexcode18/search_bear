class SessionsController < ApplicationController

	def new
	end

	def create
		user = User.find_by(parent_email: params[:parent_email])
		if user && user.authenticate(params[:password])
			session[:current_user_id] = user.id
			render json: user.to_json(:include => :bears)
		else
			# [:error, :warning, :notice].each do |type|
   #      return flash[type] unless flash[type].blank?
   #    end
		end
	end

	def destroy
		session[:current_user_id] = nil
		redirect to root_path
	end

end
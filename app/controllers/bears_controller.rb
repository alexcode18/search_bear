class BearsController < ApplicationController


	def index
	end

	def show
		@bear = Bear.find(params[:id])
		render json: @bear.to_json(include: [:user, :memories])
	end

	def create
	end

	def edit
	end

	def update
	end

	def destroy
	end

end
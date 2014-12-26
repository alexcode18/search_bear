class BearsController < ApplicationController


	def index
	end

	def show
		@bear = Bear.find(params[:id])
		render json: @bear.to_json(include: [:user, :memories])
	end

	def create
		@bear = Bear.new()
		@bear.user_id = params[:user_id]
		@bear.name = params[:name]
		@bear.gender = params[:gender]
		@bear.hunger = 100
		@bear.happiness = 100
		@bear.energy = 100

		if @bear.save()
			render json: @bear
		end
	end

	def edit
	end

	def update
	end

	def destroy
	end

	private

	def bear_params
		params.require(:bear).permit(:name, :gender, :hunger, :happiness, :energy)
	end
end
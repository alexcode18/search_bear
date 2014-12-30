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

	def automaticscore
		@bear = Bear.find(params[:id])
		@bear.energy -= 1
		@bear.happiness -= 1
		@bear.hunger -= 1
		
		@bear.save()
		render json: @bear
	end

	def raise_happy
		@bear = Bear.find(params[:id])
		if @bear.happiness <= 90 
			@bear.happiness += 10
		else
			@bear.happiness = 100
		end
		@bear.save()
		render json: @bear
	end

	def raise_hunger
		@bear = Bear.find(params[:id])
		if @bear.hunger <= 90 
			@bear.hunger += 10
		else
			@bear.hunger = 100
		end
		@bear.save()
		render json: @bear
	end

	def raise_energy
		@bear = Bear.find(params[:id])
		@bear.energy += 1

		@bear.save()
		render json: @bear
	end

	private

	def bear_params
		params.require(:bear).permit(:name, :gender, :hunger, :happiness, :energy)
	end
end
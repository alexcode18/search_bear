class MemoriesController < ApplicationController

	def create
		memory = Memory.new
		memory[:bear_id] = params[:bear_id]
		memory[:keyword] = params[:keyword]
		memory[:image_url] = params[:image_url]
		memory.save
		render json: memory
	end

	private

	def memory_params
		params.require(:memory).permit(:bear_id, :keyword, :image_url)
	end

end
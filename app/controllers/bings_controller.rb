require 'HTTParty'

class BingsController < ApplicationController

	def create
		auth = {:username => "", :password => ENV["BING_API_KEY"]}
		url = "https://api.datamarket.azure.com/Bing/Search/v1/Image?Query=%27#{params[:search]}%27&$format=JSON"
		@search = HTTParty.get(url, :basic_auth => auth)
		render json: @search
		# respond_to do |format|
		# 	format.html { render :show }
  #    	format.json { render json: @person }
  # 	end
	end
end
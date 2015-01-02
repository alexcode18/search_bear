class BingsController < ApplicationController

	def create
		auth = {:username => "", :password => ENV["BING_API_KEY"]}
		url = "https://api.datamarket.azure.com/Bing/Search/v1/Image?Query=%27#{params[:search]}%27&Adult='Strict'&Options='DisableLocationDetection'&$top=8&$format=JSON"
		@search = HTTParty.get(url, :basic_auth => auth)
		render json: @search
	end

	def add_more
		auth = {:username => "", :password => ENV["BING_API_KEY"]}
		url = "https://api.datamarket.azure.com/Bing/Search/v1/Image?Query=%27#{params[:search]}%27&Adult='Strict'&Options='DisableLocationDetection'&$top=8&$format=JSON"
		@search = HTTParty.get(url, :basic_auth => auth)
		render json: @search
	end
end
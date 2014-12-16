class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :authenticate, :current_author, :logged_in?

  def index
  	render layout: 'application', text: ''
  end

  def authenticate
  	redirect_to root_path unless session[:current_user_id]
  end

  def logged_in?
  	:current_user_id != nil
  end
end

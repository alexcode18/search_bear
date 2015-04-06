class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :authenticate, :current_user, :logged_in?

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

<script href="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.map"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.7.0/nv.d3.min.js"></script>
class UsersController < ApplicationController
  def search
    @users = User.where('name LIKE(?)', "#{params[:input]}%")
    render json: @users
  end
end

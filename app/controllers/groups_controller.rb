class GroupsController < ApplicationController
  def create
    @group = Group.new(create_params)
    if @group.save
      redirect_to controller: :messages, action: :index
    else
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  private
  def create_params
    params.require(:group).permit(:name)
  end
end

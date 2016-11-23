class GroupsController < ApplicationController
  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to :root
    else
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to :root
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name)
  end
end

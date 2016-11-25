class GroupsController < ApplicationController

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_url, notice: "グループが正しく作成されました。"
    else
      flash.now[:alert] = "グループの作成に失敗しました。"
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to root_url, notice: "グループが正しく編集されました。"
    else
      flash.now[:alert] = "グループの編集が正しく行われませんでした。"
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, {user_ids: []})
  end
end

class MessagesController < ApplicationController

  def index
    @message = Message.new
    @group = Group.find(params[:group_id])
    @groups = current_user.groups
  end

  def create
    if Message.create(message_params)
      redirect_to group_messages_path, notice: "メッセージが投稿されました。"
    else
      flash.now[:alert] = "メッセージの投稿に失敗しました。"
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:body).merge(user_id: current_user.id, group_id: params[:group_id])
  end
end

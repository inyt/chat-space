class MessagesController < ApplicationController

  def index
    @message = Message.new
    @group = Group.find(params[:group_id])
    # @groups = Group.limit(5)
    # @group = Group.first
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
    params.require(:message).permit(:body, :group_id).merge(user_id: current_user.id)
  end
end

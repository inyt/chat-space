class MessagesController < ApplicationController

  def index
    @message = Message.new
  end

  def create
    if Message.create(message_params)
      redirect_to root_url, notice: "メッセージが投稿されました。"
    else
      flash.now[:alert] = "メッセーにの投稿に失敗しました。"
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:body).merge(user_id: current_user.id)
  end
end

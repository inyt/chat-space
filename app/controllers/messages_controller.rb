class MessagesController < ApplicationController

  def index
    @message = Message.new
  end

  def create
    Message.create(message_params)
    redirect_to root_url, notice: "メッセージが投稿されました。"
  end

  private
  def message_params
    params.require(:message).permit(:body)
  end
end

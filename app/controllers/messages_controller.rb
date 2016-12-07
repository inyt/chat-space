class MessagesController < ApplicationController

  def index
    @message = Message.new
    @group = Group.find(params[:group_id])
    @groups = current_user.groups
    @users = @group.users
    @messages = @group.messages.order('created_at ASC')


    respond_to do |format|
      format.html
      if @messages
        format.json { render json: {
                                     message: @messages.last,
                                     number: @messages.length,
                                     name: @messages.last.user.name,
                                     time: @messages.last.updated_at.strftime("%Y/%m/%d %H:%M:%S")
                                   }}
      else
        format.json { render json: {} }
      end
    end
  end

  def create
    @message = Message.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path }
        format.json { render json: {
                                     message: @message,
                                     name: current_user.name,
                                     time: @message.updated_at.strftime("%Y/%m/%d %H:%M:%S")
                                    }}
        # notice: "メッセージが投稿されました。"
      end
    else
      redirect_to group_messages_path ,alert: "メッセージの投稿に失敗しました。"
    end
  end

  private
  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id, group_id: params[:group_id])
  end
end

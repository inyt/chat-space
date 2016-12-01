require 'rails_helper'

describe MessagesController do

  let!(:user) { create(:user) }
  let(:group) { create(:group, users: [user]) }
  before(:each) do
    login_user user
  end
  
  describe 'GET #index' do
    it "populates an array of messages orederd by created_at DESC" do
      messages = create_list(:message, 10, user: user, group: group)
      get :index, group_id: group
      expect(assigns(:messages)).to match(messages)
    end
    it "renders :index template" do
      get :index, group_id: group
      expect(response).to render_template :index
    end
  end
end

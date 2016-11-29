require 'rails_helper'

describe Message do
  describe '#create' do
    it "is valid with a body" do
      message = Message.new(body: "a", image: "", user_id: 1, group_id: 1)
      expect(message).to be_valid
    end

    it "is invalid without a body" do
      message = Message.new(body: "", image: "", user_id: 1, group_id: 1)
      message.valid?
      expect(message.errors[:body]).to include("を入力してください")
    end
  end
end

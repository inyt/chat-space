FactoryGirl.define do
  factory :message do
    user
    group
    body       "hello"
    image      ""
  end
end

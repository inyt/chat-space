Rails.application.routes.draw do
  devise_for :users
  resources :messages, only: :index
  resources :groups, only: [:edit, :new, :create]
end

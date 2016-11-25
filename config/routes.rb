Rails.application.routes.draw do
  devise_for :users
  resources :messages, only: [:index, :create]
  resources :groups, only: [:edit, :new, :create, :update, :show]
  root 'messages#index'
end

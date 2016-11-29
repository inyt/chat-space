Rails.application.routes.draw do
  devise_for :users
  resources :groups, only: [:edit, :new, :create, :update, :show, :index] do
    resources :messages, only: [:index, :create]
  end
  root 'groups#index'
end

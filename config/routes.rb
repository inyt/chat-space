Rails.application.routes.draw do
  devise_for :users
  get 'users/search' => 'users#search'
  resources :groups, only: [:edit, :new, :create, :update, :show, :index] do
    resources :messages, only: [:index, :create]
  end
  root 'groups#index'
end

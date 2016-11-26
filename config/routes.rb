Rails.application.routes.draw do
  devise_for :users
  resources :groups, only: [:edit, :new, :create, :update, :show] do
    resources :messages, only: [:index, :create]
  end
end

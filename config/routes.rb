Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :messages, only: :index
  root 'messages#index'
  resources :users, only: [:edit, :update]
end

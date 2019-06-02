class RemoveUsersToMessages < ActiveRecord::Migration[5.0]
  def change
    remove_foreign_key :messages, :users
    remove_reference :messages, :users
  
  end
end

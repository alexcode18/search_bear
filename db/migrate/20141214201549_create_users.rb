class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
    	t.string :parent_email
    	t.string :password_digest
    	t.string :child_name
    	t.string :favorite_color

    	t.timestamps
    end
  end
end

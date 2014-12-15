class CreateBears < ActiveRecord::Migration
  def change
    create_table :bears do |t|
    	t.string :name
    	t.string :gender
    	t.integer :hunger
    	t.integer :happiness
    	t.integer :energy
    	t.belongs_to :user

    	t.timestamps
    end
  end
end

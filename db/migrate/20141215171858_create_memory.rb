class CreateMemory < ActiveRecord::Migration
  def change
    create_table :memories do |t|
    	t.string :category
        t.string :image_url
		t.belongs_to :bear
        t.belongs_to :search
        
    	t.timestamps
    end
  end
end

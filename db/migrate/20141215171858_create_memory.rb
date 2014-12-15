class CreateMemory < ActiveRecord::Migration
  def change
    create_table :memories do |t|
    	t.text :all
    	t.text :transportation
    	t.text :fruits
    	t.text :vegetables
    	t.text :animals
    	t.text :letters
    	t.text :numbers
    	t.text :people

			t.belongs_to :bear
    	t.timestamps
    end
  end
end

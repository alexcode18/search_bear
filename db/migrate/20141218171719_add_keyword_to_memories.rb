class AddKeywordToMemories < ActiveRecord::Migration
  def change
  	add_column :memories, :keyword, :string
  end
end

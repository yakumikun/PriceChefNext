import React, { useState } from 'react';
import { Recipe } from '../lib/db';
import RecipePopup from './RecipePopup';

const recipes: Recipe[] = [
  {
    id: 1,
    name: 'スパゲッティ',
    image: 'https://via.placeholder.com/150',
    ingredients: ['パスタ', 'トマトソース', 'バジル'],
    instructions: 'パスタを茹でて、トマトソースを混ぜます。',
  },
  {
    id: 2,
    name: 'カレーライス',
    image: 'https://via.placeholder.com/150',
    ingredients: ['米', 'カレールウ', '野菜'],
    instructions: '米を炊き、カレールウを煮込みます。',
  },
  {
    id: 3,
    name: 'カルボナーラ',
    image: 'https://via.placeholder.com/150',
    ingredients: ['パスタ', '生卵', 'ベーコン', 'チーズ'],
    instructions: 'ベーコンを焼き、水を入れてパスタを茹で、チーズ・溶き卵と和えます。',
  },
  {
    id: 4,
    name: 'ポークソテー',
    image: 'https://via.placeholder.com/150',
    ingredients: ['豚肉', 'キャベツ', 'にんにく', 'ケチャップ', 'ウスターソース'],
    instructions: 'ニンニクの香りを付けた油で豚肉とキャベツを炒め、ソースを絡めます。',
  },
];

const RecipeList: React.FC<{ onAddToShoppingList: (ingredients: string[]) => void }> = ({ onAddToShoppingList }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const closePopup = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="flex justify-center text-2xl text-orange-600 font-bold mb-4">レシピから探す</h1>
      <div className="grid grid-cols-3 gap-4 mx-auto max-w-xl">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border p-4 rounded-lg shadow flex flex-col">
            <img src={recipe.image} alt={recipe.name} className="mb-2" />
            <h2 className="text-xl font-semibold">{recipe.name}</h2>
            <button 
              onClick={() => handleRecipeSelect(recipe)} 
              className="mt-2 bg-orange-600 text-white px-4 py-2 rounded mx-auto max-w-sm"
            >
              詳細
            </button>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <RecipePopup 
        recipe={selectedRecipe}
        onClose={closePopup}
        onAddToShoppingList={onAddToShoppingList}
        />
      )}
    </div>
  );
};

export default RecipeList;
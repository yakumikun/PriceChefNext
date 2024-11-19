import React, { useState, useEffect } from 'react';
import { Recipe } from '../lib/db';
import RecipePopup from './RecipePopup';


const RecipeList: React.FC<{ onAddToShoppingList: (ingredients: string[]) => void }> = ({ onAddToShoppingList }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch('/api/recipe'); // すべてのレシピを取得するAPIルート
      const data = await res.json();
      setRecipes(data.recipes);
    };

    fetchRecipes();
  }, []);

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
          <div key={recipe.id} className="border rounded-lg shadow flex flex-col">
            <img src={recipe.image} alt={recipe.name} className="mb-2 rounded-t-lg" />
            <h2 className="text-xl font-semibold ml-2">{recipe.name}</h2>
            <button 
              onClick={() => handleRecipeSelect(recipe)} 
              className="mt-2 bg-orange-600 text-white px-4 py-2 mb-2 rounded mx-auto max-w-sm"
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
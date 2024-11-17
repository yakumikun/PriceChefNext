import React from 'react';
import { Recipe } from '../lib/db';

interface RecipePopupProps {
    recipe: Recipe;
    onClose: () => void;
    onAddToShoppingList: (ingredients: string[]) => void;
}

const RecipePopup: React.FC<RecipePopupProps> = ({ recipe, onClose, onAddToShoppingList }) => {
    const handleAddToShoppingList = () => {
        onAddToShoppingList(recipe.ingredients);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-1/2 relative mx-auto max-w-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-orange-600 text-6xl"
                >
                    ×
                </button>
                <div className='flex flex-col'>
                    <h2 className="text-2xl font-bold">{recipe.name}</h2>
                    <div className='flex flex-between'>
                        <img src={recipe.image} alt={recipe.name} className="mt-11 h-40" />
                        <div className='ml-32 mt-12'>
                            <p className="mb-4">{recipe.instructions}</p>
                            <h3 className="font-semibold">必要な材料:</h3>
                            <ul className="list-disc pl-5">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>


                <button
                    onClick={handleAddToShoppingList}
                    className="mt-4 bg-orange-600 text-white px-4 py-2 rounded"
                >
                    お買い物リストを作成
                </button>
            </div>
        </div>
    );
};

export default RecipePopup;
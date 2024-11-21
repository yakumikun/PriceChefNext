import React from 'react';
import { Recipe } from '../lib/prisma';

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
            <div className="bg-white p-6 rounded-lg w-1/2 h-2/3 relative overflow-y-auto mx-auto">
                <button
                    onClick={onClose}
                    className="absolute top-1 right-3 text-orange-600 text-6xl"
                >
                    ×
                </button>
                <div className=''>
                    
                    <div className=''>
                        <img src={recipe.image} alt={recipe.name} className="mt-10 h-96" />
                        <h2 className="text-2xl font-semibold mt-4 ml-2">{recipe.name}</h2>
                        <div className='mt-3'>
                            <h3 className="text-xl font-semibold ml-2">材料:</h3>
                            <ul className="list-none ml-2 mt-1">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className='mt-1 border-b'>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='mt-3'>
                            <h3 className='text-xl font-semibold ml-2'>作り方:</h3>
                            <ul className='list-decimal ml-6 mt-1'>
                                {recipe.instructions.map((instructions, index) => (
                                    
                                    <li key={index} className='mt-1 border-b'>{instructions}</li>
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
'use client';

import React, { useState } from 'react';

interface RecipePostPopupProps {
    onClose: () => void;
}

const RecipePostPopup: React.FC<RecipePostPopupProps> = ({ onClose }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [instructions, setInstructions] = useState<string[]>(['']);
    const [error, setError] = useState('');

    const handleAddIngredient = () => setIngredients([...ingredients, '']);
    const handleRemoveIngredient = (index: number) =>
        setIngredients(ingredients.filter((_, idx) => idx !== index));

    const handleAddInstruction = () => setInstructions([...instructions, '']);
    const handleRemoveInstruction = (index: number) =>
        setInstructions(instructions.filter((_, idx) => idx !== index));



    const handleSubmit = async () => {
        if (!name || !image || ingredients.some(i => !i) || instructions.some(i => !i)) {
            setError('すべての項目を入力してください。');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', image as Blob);
            // 仮の画像アップロード (実際はS3等にアップロード)
            const imageUrl = 'uploaded_image_url_placeholder';

            const res = await fetch('/api/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    image_url: imageUrl,
                    instructions,
                    ingredients,
                }),
            });

            if (!res.ok) throw new Error('投稿に失敗しました。');

            onClose();
        } catch (error) {
            setError('エラーが発生しました。');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-3/4 h-3/4 relative overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-6 text-red-600 text-xl">
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-4">レシピを投稿</h2>
                {error && <p className="text-red-600 mb-2">{error}</p>}
                <div className="mb-4">
                    <label className="block font-bold mb-2">料理名</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2">写真</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2">材料</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) =>
                                    setIngredients(ingredients.map((i, idx) => idx === index ? e.target.value : i))
                                }
                                className="flex-grow border rounded px-3 py-2"
                            />
                            <button
                                onClick={() => handleRemoveIngredient(index)}
                                className="ml-2 px-2 text-base text-white font-bold bg-red-600 rounded-full"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={handleAddIngredient}
                        className="text-blue-500 text-sm"
                    >
                        + 材料を追加
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2">レシピ</label>
                    {instructions.map((instruction, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex items-center">
                                <p className="mr-2">手順 {index + 1}</p>
                                <button
                                    onClick={() => handleRemoveInstruction(index)}
                                    className="ml-auto px-2 text-base text-white font-bold bg-red-600 rounded-full"
                                >
                                    &times;
                                </button>
                            </div>
                            <textarea
                                value={instruction}
                                onChange={(e) =>
                                    setInstructions(instructions.map((i, idx) => idx === index ? e.target.value : i))
                                }
                                className="w-full max-w-2xl border rounded px-3 py-2"
                            />
                        </div>
                    ))}
                    <button
                        onClick={handleAddInstruction}
                        className="text-blue-500 text-sm"
                    >
                        + 手順を追加
                    </button>
                </div>
                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-orange-500 text-white px-6 py-2 rounded"
                >
                    投稿する
                </button>
            </div>
        </div>
    );
};

export default RecipePostPopup;
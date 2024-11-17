import React from 'react'
import { useShoppingList } from '@/hooks/useShoppingList'

interface ShoppingListSidebarProps {
    isVisible: boolean;
    closeSidebar: () => void;
}

const ShoppingListSidebar: React.FC<ShoppingListSidebarProps> = ({isVisible, closeSidebar}) => {
    const { shoppingList, removeItem, clearList } = useShoppingList();

    if (!isVisible) return null;

    return (
        <div className={`fixed right-0 top-0 h-full w-64 bg-white p-4 shadow-md z-50 transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' :  'translate-x-full'}`}>
            <button onClick={closeSidebar} className='absolute top-4 right-4 text-white bg-orange-600 rounded-full w-8 h-8 flex items-center justify-center'>
                &times;
            </button>
            <h2 className='text-lg font-bold mb-4 text-orange-600'>お買い物リスト</h2>
            {shoppingList.length === 0 ? (
                <p className='text-black'>商品を追加してください</p>
            ) : (
                <ul className='space-y-2'>
                    {shoppingList.map(item => (
                        <li key={item.id} className='flex justify-between items-center'>
                            <span>{item.name} - {item.price} 円</span>
                            <button
                                onClick={() => removeItem(item.id)}
                                className='text-red-500 hover:text-red-700'
                            >
                                削除
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <button
                onClick={clearList}
                className='mt-4 bg-orange-600 text-white px-3 py-1 rounded hover:bg-red-600'
            >
                リストを空にする
            </button>
        </div>
    );
};

export default ShoppingListSidebar

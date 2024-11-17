import { useState } from 'react';

type ShoppingItem = {
    id: string;
    name: string;
    storeName: string;
    price: number;
}

export const useShoppingList = () => {
    const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);

    const addItem = (item: ShoppingItem) => {
        setShoppingList(prevList => [...prevList, item]);
    };

    const removeItem = (id: string) => {
        setShoppingList(prevList => prevList.filter(item => item.id !== id));
    };

    const clearList = () => {
        setShoppingList([]);
    };

    return { shoppingList, addItem, removeItem, clearList };
};
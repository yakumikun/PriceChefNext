"use client"

import React, { useState } from 'react';
import RecipeList from '../../components/RecipeList';
import ShoppingListSidebar from '../../components/ShoppingListSidebar';
import useSupermarketSearch from '@/hooks/useSupermarketSearch';
import RecipePostPopup from '@/components/RecipePost';

const Page: React.FC = () => {
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { supermarkets, searchSupermarkets } = useSupermarketSearch();
  const [isPostPopupVisible, setPostPopupVisible] = useState(false);

  const handleAddToShoppingList = async (ingredients: string[]) => {
    const updatedList: any[] = [];

    for (const ingredient of ingredients) {
      let cheapestSupermarket: any = null;

      for (const supermarket of supermarkets) {
        const matchingProduct = supermarket.products.find(
          (product) => product.name === ingredient
        );

        if (
          matchingProduct &&
          (!cheapestSupermarket ||
            matchingProduct.price < cheapestSupermarket.price)
        ) {
          cheapestSupermarket = {
            id: `${supermarket.name}-${ingredient}`,
            supermarketName: supermarket.name,
            ingredient,
            price: matchingProduct.price,
          };
        }
      }

      if (cheapestSupermarket) {
        updatedList.push(cheapestSupermarket);
      }
    }

    setShoppingList((prevList) => [...prevList, ...updatedList]);
    setSidebarVisible(true);
  };

  return (
    <div className="flex">
      <div className="flex-grow">
        <RecipeList onAddToShoppingList={handleAddToShoppingList} />
      </div>
      <div className="flex-shrink-0">
        <ShoppingListSidebar
          isVisible={isSidebarVisible}
          closeSidebar={() => setSidebarVisible(false)}
        />
      </div>
      <button
        onClick={() => setPostPopupVisible(true)}
        className="fixed bottom-8 right-8 bg-orange-600 text-white p-4 rounded-full"
      >
        レシピを投稿
      </button>
      {isPostPopupVisible && (
        <RecipePostPopup onClose={() => setPostPopupVisible(false)} />
      )}
    </div>
  );
};

export default Page;
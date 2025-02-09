// "use client"

// import React, { useState } from 'react';
// import RecipeList from '../../components/RecipeList';
// import ShoppingListSidebar from '../../components/ShoppingListSidebar';
// import useSupermarketSearch from '../../hooks/useSupermarketSearch';
// import RecipePostPopup from '../../components/RecipePost';

// type Product = {
//   name: string;
//   price: number;
// };

// type Supermarket = {
//   name: string;
//   products: Product[];
// };

// const Page: React.FC = () => {
//   const [, setShoppingList] = useState<
//   {
//     id: string;
//     supermarketName: string;
//     ingredient: string;
//     price: number;
//   }[]
//   >([]);
//   const [isSidebarVisible, setSidebarVisible] = useState(false);
//   const { supermarkets,} = useSupermarketSearch();
//   const [isPostPopupVisible, setPostPopupVisible] = useState(false);

//   const handleAddToShoppingList = async (ingredients: string[]) => {
//     const updatedList: {
//       id: string;
//   supermarketName: string;
//   ingredient: string;
//   price: number;
//     }[] = [];

//     for (const ingredient of ingredients) {
//       let cheapestSupermarket: {
//         id: string;
//         supermarketName: string;
//         ingredient: string;
//         price: number;
//       } | null = null;

//       for (const supermarket of supermarkets) {
//         const matchingProduct = supermarket.products.find(
//           (product) => product.name === ingredient
//         );

//         if (
//           matchingProduct &&
//           (!cheapestSupermarket ||
//             matchingProduct.price < cheapestSupermarket.price)
//         ) {
//           cheapestSupermarket = {
//             id: `${supermarket.name}-${ingredient}`,
//             supermarketName: supermarket.name,
//             ingredient,
//             price: matchingProduct.price,
//           };
//         }
//       }

//       if (cheapestSupermarket) {
//         updatedList.push(cheapestSupermarket);
//       }
//     }

//     setShoppingList((prevList) => [...prevList, ...updatedList]);
//     setSidebarVisible(true);
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="flex-grow">
//         <RecipeList onAddToShoppingList={handleAddToShoppingList} />
//       </div>
//       <div className="flex-shrink-0">
//         <ShoppingListSidebar
//           isVisible={isSidebarVisible}
//           closeSidebar={() => setSidebarVisible(false)}
//         />
//       </div>
//       <button
//         onClick={() => setPostPopupVisible(true)}
//         className="fixed bottom-8 right-8 bg-orange-600 text-white p-4 rounded-full"
//       >
//         レシピを投稿
//       </button>
//       {isPostPopupVisible && (
//         <RecipePostPopup onClose={() => setPostPopupVisible(false)} />
//       )}
//     </div>
//   );
// };

// export default Page;

"use client";

import React, { useState } from "react";
import RecipeList from "../../components/RecipeList";
import ShoppingListSidebar from "../../components/ShoppingListSidebar";
import useSupermarketSearch from "../../hooks/useSupermarketSearch";
import RecipePostPopup from "../../components/RecipePost";

type Product = {
  name: string;
  price: number;
};

type Supermarket = {
  name: string;
  products: Product[];
};

const Page: React.FC = () => {
  const [, setShoppingList] = useState<
    {
      id: string;
      supermarketName: string;
      ingredient: string;
      price: number;
    }[]
  >([]);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { supermarkets } = useSupermarketSearch() as { supermarkets: Supermarket[] };
  const [isPostPopupVisible, setPostPopupVisible] = useState(false);

  const handleAddToShoppingList = async (ingredients: string[]) => {
    const updatedList: {
      id: string;
      supermarketName: string;
      ingredient: string;
      price: number;
    }[] = [];

    for (const ingredient of ingredients) {
      let cheapestSupermarket: {
        id: string;
        supermarketName: string;
        ingredient: string;
        price: number;
      } | null = null;

      for (const supermarket of supermarkets) {
        const matchingProduct: Product | undefined = supermarket.products.find(
          (product) => product.name === ingredient
        );

        if (
          matchingProduct &&
          (!cheapestSupermarket || matchingProduct.price < cheapestSupermarket.price)
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
    <div className="flex h-screen">
      <div className="flex-grow">
        <RecipeList onAddToShoppingList={handleAddToShoppingList} />
      </div>
      <div className="flex-shrink-0">
        <ShoppingListSidebar isVisible={isSidebarVisible} closeSidebar={() => setSidebarVisible(false)} />
      </div>
      <button
        onClick={() => setPostPopupVisible(true)}
        className="fixed bottom-8 right-8 bg-orange-600 text-white p-4 rounded-full"
      >
        レシピを投稿
      </button>
      {isPostPopupVisible && <RecipePostPopup onClose={() => setPostPopupVisible(false)} />}
    </div>
  );
};

export default Page;

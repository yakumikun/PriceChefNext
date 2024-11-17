// import React, { useEffect, useState } from 'react';

// type Supermarket = {
//     name: string;
//     distance: string;
// };

// type Product = {
//     id: number;
//     name: string;
//     price: number;
// };

// type SupermarketWithProductsProps = {
//     supermarket: Supermarket;
//     products: Product[];
// };

// const SupermarketWithProducts: React.FC<SupermarketWithProductsProps> = ({ supermarket, products = [] }) => {
//     const [translatedName, setTranslatedName] = useState<string>(supermarket.name);
//     const [translatedProducts, setTranslatedProducts] = useState<Product[]>(products);

//     useEffect(() => {
//         const fetchTranslation = async () => {
//             try {
//                 const response = await fetch('/api/translate', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         text: supermarket.name,
//                         target: 'ja',
//                     }),
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     setTranslatedName(data.translatedText);
//                 } else {
//                     console.error('翻訳エラー:',data.error);
//                 }
//             } catch (error) {
//                 console.error('APIリクエストエラー',error);
//             }
//         }
//         fetchTranslation();
//     },[supermarket.name]);

//     useEffect(() => {
//         const translateProducts = async () => {
//             try {
//                 const translated = await Promise.all(products.map(async (product) => {
//                     const response = await fetch('/api/translate', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({
//                             text: product.name,
//                             target: 'ja',
//                         }),
//                     });
//                     const data = await response.json();
//                     if (response.ok) {
//                         return { ...product, name: data.translatedText };
//                     } else {
//                         console.error('翻訳エラー:', data.error);
//                         return product;
//                     }
//                 }));
//                 setTranslatedProducts(translated);
//             } catch (error) {
//                 console.error('APIリクエストエラー', error);
//             }
//         };
//         if (products.length > 0) {
//             translateProducts();
//         }
//     }, [products]);

//     return (
//         <div className="border border-gray-300 mb-4 p-4">
//             {/* スーパー情報 */}
//             <div className="flex items-center mb-4">
//                 <div className="flex-1">
//                     <h3 className="text-lg font-semibold">{translatedName}</h3>
//                     <p className="text-gray-500">現在地から{supermarket.distance}</p>
//                 </div>
//                 <div className="w-12 h-12 bg-gray-200 rounded-full"></div> {/* 画像のプレースホルダー */}
//             </div>

//             {/* 商品リスト（横スクロール可能） */}
//             <div className="overflow-x-auto">
//                 <div className="flex space-x-4">
//                     {products.map((product) => (
//                         <div key={product.id} className="inline-block min-w-[150px] text-center p-4 border border-gray-300">
//                             <p className="text-sm text-gray-700">{product.name}</p>
//                             <p className="text-red-600 font-bold text-lg">{ product.price }円</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SupermarketWithProducts;
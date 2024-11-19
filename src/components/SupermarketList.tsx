import React from 'react';


type Product = {
    id: string;
    name: string;
    price: number;
    sale: boolean;
    createdAt: string;
};

type Supermarket = {
    supermarketId: string;
    name: string;
    distance: string;
    products: Product[];
};

type SupermarketListProps = {
    supermarketsInfo: Supermarket[];
    searchComplete: boolean;
};

const SupermarketList: React.FC<SupermarketListProps> = ({ supermarketsInfo, searchComplete }) => {
    return (
        <div>
            {searchComplete && supermarketsInfo.length === 0 ? (
                <p className='flex justify-center font-bold text-gray-500 min-w-full'>スーパー情報がありません。</p>
            ) : (
                supermarketsInfo.map((supermarket) => (
                    <div key={supermarket.supermarketId} className='border border-gray-300 mb-4 p-4'>
                        {/* スーパー情報 */}
                        <div className="flex items-center mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{supermarket.name}</h3>
                                <p className="text-gray-500">現在地から{supermarket.distance}</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div> {/* 画像のプレースホルダー */}
                        </div>

                        {/* 商品リスト（横スクロール可能） */}
                        {supermarket.products.length > 0 ? (
                            <div className="flex relative">
                                <div className="flex overflow-x-auto gap-4 p-4">
                                    {supermarket.products.map((product) => (
                                        <div key={product.id} className="min-w-[220px] flex flex-col p-4 border border-gray-300 font-extrabold">
                                            <p className="text-lg text-black text-left">{product.name}</p>
                                            <p className="text-red-600 font-bold text-2xl text-right">{product.price}円</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>製品情報はありません。</p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default SupermarketList;



//     return (
//         <div>
//             {supermarketsInfo.length > 0 ? (
//                 supermarketsInfo.map((supermarket) => {
//                     console.log("スーパーのID:", supermarket.supermarketId);
//                     return (
//                         <div key={supermarket.supermarketId} className='border border-gray-300 mb-4 p-4'>
//                         {/* スーパー情報 */}
//                         <div className="flex items-center mb-4">
//                             <div className="flex-1">
//                                 <h3 className="text-lg font-semibold">{supermarket.name}</h3>
//                                 <p className="text-gray-500">現在地から{supermarket.distance}</p>
//                             </div>
//                             <div className="w-12 h-12 bg-gray-200 rounded-full"></div> {/* 画像のプレースホルダー */}
//                         </div>

//                         {/* 商品リスト（横スクロール可能） */}
//                         {supermarket.products.length > 0 ? (
//                             <div className="overflow-x-auto">
//                                 <div className="flex space-x-4">
//                                     {supermarket.products.map((product) => (
//                                         <div key={product.productId} className="min-w-[150px] flex items-center p-4 border border-gray-300">
//                                             <p className="text-sm text-gray-700">{product.name}</p>
//                                             <p className="text-red-600 font-bold text-lg">{product.price}円</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ) : (
//                             <p>製品情報はありません。</p>
//                         )}
//                     </div>
//                 );
//             })
//         ) : (
//             <p></p>
//         )}
//     </div>
// );
// };

// export default SupermarketList;
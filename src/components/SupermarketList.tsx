import React from 'react';

type Product = {
    id: string;
    name: string;
    price: number;
    sale: boolean;
    isCheaper: boolean;
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
                <p className="flex justify-center font-bold text-gray-500 min-w-full">スーパー情報がありません。</p>
            ) : (
                supermarketsInfo.map((supermarket) => (
                    <div key={supermarket.supermarketId} className="border border-gray-300 mb-4 p-4">
                        {/* スーパー情報 */}
                        <div className="flex items-center mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{supermarket.name}</h3>
                                <p className="text-gray-500">現在地から{supermarket.distance}</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        </div>

                        {/* 商品リスト */}
                        {supermarket.products && supermarket.products.some((product) => product.isCheaper) ? (
                            <div className="flex relative">
                                <div className="flex overflow-x-auto gap-4 p-4">
                                    {supermarket.products
                                        .filter((product) => product.isCheaper)
                                        .map((product) => (
                                            <div key={product.id} className="min-w-[220px] flex flex-col p-4 border border-gray-300 font-extrabold">
                                                <p className="text-lg text-black text-left">{product.name}</p>
                                                <p className="text-red-600 font-bold text-2xl text-right">{product.price}円</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ) : (
                            <p>安い商品はありません。</p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default SupermarketList;


// import React from 'react';

// type Product = {
//     id: string;
//     name: string;
//     price: number;
//     sale: boolean;
//     isCheaper: boolean;
// };

// type Supermarket = {
//     supermarketId: string;
//     name: string;
//     distance: string;
//     products: Product[];
// };

// type SupermarketListProps = {
//     supermarketsInfo: Supermarket[];
//     searchComplete: boolean;
// };

// const SupermarketList: React.FC<SupermarketListProps> = ({ supermarketsInfo, searchComplete }) => {
//     return (
//         <div>
//             {searchComplete && supermarketsInfo.length === 0 ? (
//                 <p className='flex justify-center font-bold text-gray-500 min-w-full'>スーパー情報がありません。</p>
//             ) : (
//                 supermarketsInfo.map((supermarket) => (
//                     <div key={supermarket.supermarketId} className='border border-gray-300 mb-4 p-4'>
//                         {/* スーパー情報 */}
//                         <div className="flex items-center mb-4">
//                             <div className="flex-1">
//                                 <h3 className="text-lg font-semibold">{supermarket.name}</h3>
//                                 <p className="text-gray-500">現在地から{supermarket.distance}</p>
//                             </div>
//                             <div className="w-12 h-12 bg-gray-200 rounded-full"></div> {/* 画像のプレースホルダー */}
//                         </div>

//                         {/* 商品リスト（横スクロール可能） */}
//                         {supermarket.products && supermarket.products.length > 0 ? (
//                             <div className="flex relative">
//                                 <div className="flex overflow-x-auto gap-4 p-4">
//                                     {supermarket.products.filter((product) => product.isCheaper).map((product) => (
//                                             <div key={product.id} className="min-w-[220px] flex flex-col p-4 border border-gray-300 font-extrabold">
//                                                 <p className="text-lg text-black text-left">{product.name}</p>
//                                                 <p className="text-red-600 font-bold text-2xl text-right">{product.price}円</p>
//                                             </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ) : (
//                             <p>製品情報はありません。</p>
//                         )}
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default SupermarketList;
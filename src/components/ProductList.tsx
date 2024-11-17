import React from 'react';

interface Product {
    name: string;
    price: number;
    sale: boolean;
}

interface ProductListProps {
    products: Product[];
    onRemoveProduct: (index: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onRemoveProduct }) => (
    <div className='mt-4'>
        {products.length > 0 ? (
            products.map((product, index) => (
                <div key={index} className="flex justify-between items-center px-3 mb-2 shadow-md">
                    <div>{product.name}<span className='px-2' />{product.price}円 {product.sale ? "(セール)" : ""}</div>
                    <button
                        type="button"
                        onClick={() => onRemoveProduct(index)}
                        className="border ml-4 my-2 px-2 py-1 bg-orange-600 text-white font-bold rounded-md"
                    >
                        削除
                    </button>
                </div>
            ))
        ) : (
            <p className='text-center'>商品が追加されてません。</p>    
        )}
    </div>
);

export default ProductList;
"use client"

import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import SupermarketSelect from './SupermarketSelect';

interface SupermarketOption {
    value: string;
    label: string;
}

interface Product {
    name: string;
    price: number;
    sale: boolean;
}

const RegisterPricesForm: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [storeName, setStoreName] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    

    const handleAddProduct = (name: string, price: number, sale: boolean) => {
        if (!name || price <= 0) return;
        setProducts(prevProducts => [...prevProducts, { name, price, sale }]);
    };

    const handleRemoveProduct = (index: number) => {
        setProducts(prevProducts => prevProducts.filter((_, i) => i !== index));
    };

    const handleStoreSelect = (selectedStore: SupermarketOption | null) => {
        if (selectedStore) {
            setStoreName(selectedStore.label);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        if (!storeName || products.length === 0) {
            setMessage("商品リストが空です。少なくとも1つの商品を登録してください。");
            return;
        }

        const productData = { storeName, products };
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
            const data = await response.json();
            setMessage(response.ok ? data.message : `登録に失敗しました`);
            if (response.ok) {
                setProducts([]);
                setStoreName(null);
            }
        } catch (error) {
            console.error("エラー:", error);
            setMessage("商品登録中にエラーが発生しました。");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <SupermarketSelect onStoreSelect={handleStoreSelect} />
            <ProductForm onAddProduct={handleAddProduct} />
            <div className='product-list mt-4'>
                <h3 className='text-center text-orange-600 text-xl font-semibold'>商品リスト</h3>
                <ProductList products={products} onRemoveProduct={handleRemoveProduct} />
            </div>
            <button type="submit" className='mx-60 border mt-5 mb-8 py-2 px-2 bg-orange-600 text-white font-bold rounded-md'>
                登録する
            </button>
            {message && <p className='text-center text-red-500'>{message}</p>}
        </form>
    );
};

export default RegisterPricesForm;
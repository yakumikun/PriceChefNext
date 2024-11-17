"use client"

import React, { useState } from 'react';

interface ProductFormProps {
  onAddProduct: (name: string, price: number, sale: boolean) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [sale, setSale] = useState(false);

  const handleAddProduct = () => {
    if (!name || price <= 0) return;
    onAddProduct(name, price, sale);
    setName('');
    setPrice(0);
    setSale(false);
  };

  return (
    <div className="flex items-center mb-2">
      <input
        type="text"
        name='ProductName'
        placeholder="商品名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='border mt-5 mx-2 pl-2 py-2'
      />
      <input
        type="number"
        name='price'
        placeholder="価格"
        value={price === 0 ? '' : price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        className='border mt-5 mx-2 pl-2 py-2'
      />
      <label className='mt-5 mx-2'>
        <input
          type="checkbox"
          name='sale'
          checked={sale}
          onChange={(e) => setSale(e.target.checked)}
          aria-label="セール商品"
        />
        セール商品
      </label>
      <button
        type="button"
        onClick={handleAddProduct}
        className='border ml-4 mt-4 px-3 py-1 bg-orange-600 text-white font-bold rounded-md'
      >
        +
      </button>
    </div>
  );
};

export default ProductForm;
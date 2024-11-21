"use client"

import React, { useState } from 'react';
import { SearchableSelect } from './SearchableSelect';

interface ProductOption {
  value: string;
  label: string;
}

interface ProductFormProps {
  onAddProduct: (name: string, quantity: string, price: number, sale: boolean) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState(0);
  const [sale, setSale] = useState(false);

  const fetchProductOptions = async (inputValue: string): Promise<ProductOption[]> => {
    const allProducts = [
      { value: 'cabbage', label: 'キャベツ' },
      { value: 'greenOnion', label: 'ねぎ' },
      { value: 'lettuce', label: 'レタス' },
      { value: 'onion', label: 'たまねぎ' },
      { value: 'tomato', label: 'トマト' },
      { value: 'carrot', label: 'にんじん' },
      { value: 'ChineseCabbage', label: 'はくさい' },
      { value: 'daikon', label: 'だいこん' },
      { value: 'bread', label: '食パン' },
      { value: 'boiledUdon', label: 'ゆでうどん' },
      { value: 'flour', label: '小麦粉' },
      { value: 'milk', label: '牛乳' },
      { value: 'cheese', label: 'チーズ' },
      { value: 'butter', label: 'バター' },
      { value: 'tofu', label: '豆腐' },
      { value: 'canolaOil', label: 'キャノーラ油' },
      { value: 'saladOil', label: 'サラダ油' },
      { value: 'margarine', label: 'マーガリン' },
      { value: 'miso', label: 'みそ' },
      { value: 'kamaboko', label: 'かまぼこ' },
      { value: 'mayonnaise', label: 'マヨネーズ' },
      { value: 'soySauce', label: 'しょう油' },
      { value: 'tunaCan', label: 'まぐろ缶詰' },
      { value: 'importedBeef', label: '輸入牛ロース肉' },
      { value: 'domesticBeef', label: '国産牛ロース肉' },
      { value: 'pork', label: '豚ロース肉' },
      { value: 'chicken', label: '鶏もも肉' },
      { value: 'egg', label: '鶏卵(10個入り)' },
      { value: 'tuna', label: 'まぐろ' },
      { value: 'shrimp', label: 'えび' },
      { value: 'yellowtail', label: 'ぶり' },
      { value: 'salmon', label: 'さけ' },
      { value: 'apple', label: 'りんご' },
      { value: 'mandarinOrange', label: 'みかん' },
      { value: 'banana', label: 'バナナ' },
      { value: 'grape', label: 'ぶどう' },
      { value: 'JapaneseNashi', label: '日本なし' },
      { value: 'peach', label: 'もも' },
      
    ];
    return allProducts.filter((product) => product.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const handleAddProduct = () => {
    if (!name || price <= 0) return;
    onAddProduct(name, quantity, price, sale);
    setName('');
    setQuantity('');
    setPrice(0);
    setSale(false);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  return (
    <div className="flex items-center mb-2">
      <div id='name' className='pt-5 mx-auto min-w-40'>
        <SearchableSelect<ProductOption>
          options={[]}
          fetchOptions={fetchProductOptions}
          placeholder="商品名を選択"
          onChange={(selectedOption) => setName(selectedOption?.label || '')}
        />
      </div>
      <input
        id="quantity"
        type="text"
        value={quantity}
        onChange={handleQuantityChange}
        className="border mt-5 mx-2 pl-2 py-2"
        placeholder="内容量(例: 500g, 6個)"
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
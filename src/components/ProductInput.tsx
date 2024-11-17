import React, { useState } from 'react';

interface Product {
    name: string;
    price: number;
    sale: boolean;
  }

  interface ProductInputProps {
    product: Product;
    onProductChange: (field: keyof Product, value: string | number | boolean) => void;
    onRemove: () => void;
  }

const ProductInput: React.FC<ProductInputProps> = ({ product, onProductChange, onRemove }) => {
  return (
    <div className="product-input">
      <input
        type="text"
        placeholder="商品名"
        value={product.name}
        onChange={(e) => onProductChange('name', e.target.value)}
        required
        className='border mt-5 mx-2 pl-2 py-2'
      />
      <input
        type="number"
        placeholder="価格"
        value={product.price}
        onChange={(e) => onProductChange('price', parseFloat(e.target.value))}
        required
        className='border mt-5 mx-2 pl-2 py-2'
      />
      <label className='pl-2'>
        <input
          type="checkbox"
          checked={product.sale}
          onChange={(e) => onProductChange('sale', e.target.checked)}
        />
        セール商品
      </label>
    </div>
  );
};

export default ProductInput;

// import React, { useState } from 'react';

// interface ProductInputProps {
//     onAddProduct: (name: string, price: number, sale: boolean) => void;
// }

// const ProductInput: React.FC<ProductInputProps> = ({ onAddProduct }) => {
//     const [productName, setProductName] = useState('');
//     const [productPrice, setProductPrice] = useState('');
//     const [isSale, setIsSale] = useState(false);

//     const handleAddProduct = () => {
//         // 商品名と価格が空でないかをチェック
//         if (productName.trim() === '' || productPrice.trim() === '') {
//             alert("商品名と価格を入力してください。");
//             return;
//         }

//         const priceNumber = parseFloat(productPrice);
//         // 価格が数値かをチェック
//         if (isNaN(priceNumber)) {
//             alert("価格は数値で入力してください。");
//             return;
//         }

//         // 親コンポーネントに商品を追加するための関数を呼び出す
//         onAddProduct(productName, priceNumber, isSale);
//         // 入力フィールドをリセット
//         setProductName('');
//         setProductPrice('');
//         setIsSale(false);
//     };

//     return (
//         <div className="flex items-center mb-2">
//             <input
//                 type="text"
//                 placeholder="商品名"
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//                 required
//                 className='border mt-5 mx-2 pl-2 py-2'
//             />
//             <input
//                 type="number"
//                 placeholder="価格"
//                 value={productPrice}
//                 onChange={(e) => setProductPrice(e.target.value)}
//                 required
//                 className='border mt-5 mx-2 pl-2 py-2'
//             />
//             <label className='mt-5 mx-2'>
//                 <input
//                     type="checkbox"
//                     checked={isSale}
//                     onChange={(e) => setIsSale(e.target.checked)}
//                 />
//                 セール商品
//             </label>
//             <button
//                 type="button"
//                 onClick={handleAddProduct}  // 引数を渡さずに直接関数を呼び出す
//                 className='border ml-2 mt-4 px-2 py-1 bg-orange-600 text-white font-bold rounded-md'
//             >
//                 +
//             </button>
//         </div>
//     );
// };

// export default ProductInput;
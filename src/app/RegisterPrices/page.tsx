// "use client"

// import React, { useState, useEffect } from 'react';
// import ProductInput from '../../components/ProductInput';
// import Select, { SingleValue, StylesConfig } from 'react-select';
// import { useLocation } from '@/hooks/useLocation';

// interface Product {
//   name: string;
//   price: number;
//   sale: boolean;
// }

// interface SupermarketOption {
//   value: string;
//   label: string;
// }

// const RegisterPrices: React.FC = () => {
//   const { latitude, longitude } = useLocation();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [storeName, setStoreName] = useState<SupermarketOption | null>(null);
//   const [message, setMessage] = useState('');
//   const [options, setOptions] = useState<SupermarketOption[]>([]);
//   const [inputValue, setInputValue] = useState('');
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState(0);
//   const [sale, setSale] = useState(false);

//   useEffect(() => {
//     console.log("緯度:", latitude, "経度:", longitude);
//   }, [latitude, longitude]);

//   const handleAddProduct = () => {
//     if (!name || price <= 0) return;  
//     setProducts([...products, { name, price: Number(price), sale }]);
//     setName('');
//     setPrice(0);
//     setSale(false);
//   };

//   const handleRemoveProduct = (index: number) => {
//     setProducts(products.filter((_, i) => i !== index));
//   };

//   const handleProductChange = (index: number, field: keyof Product, value: string | number | boolean) => {
//     setProducts((prev) => {
//       const updatedProducts = [...prev];
//       updatedProducts[index] = { ...updatedProducts[index], [field]: value };
//       return updatedProducts;
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!storeName || products.length === 0) {
//         setMessage("店舗名と商品情報は必須です。");
//         return;
//     }

//     const productData = {
//         storeName: storeName.value,
//         products: products,
//     };

//     try {
//         const response = await fetch('/api/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(productData),
//         });

//         const data = await response.json();
//         if (!response.ok) {
//             setMessage(`登録に失敗しました: ${data.error}`);
//             return;
//         }

//         setMessage(data.message);
//     } catch (error) {
//         console.error("エラー:", error);
//         setMessage("商品登録中にエラーが発生しました。");
//     }
// };

//   const fetchSupermarkets = async (inputValue: string, lat: string | null, lng: string | null) => {
//     if (!inputValue || !lat || !lng) return setOptions([]);

//     try {
//       const response = await fetch(`/api/searchSupermarkets?query=${encodeURIComponent(inputValue)}&lat=${lat}&lng=${lng}`);
//       const data = await response.json();

//       setOptions(
//         Array.isArray(data.results)
//           ? data.results.map((result: { name: string, place_id: string }) => ({
//               value: result.place_id,
//               label: result.name,
//             }))
//           : []
//       );
//     } catch (error) {
//       console.error("Error fetching supermarkets:", error);
//       setOptions([]);
//     }
//   };

//   const handleInputChange = (inputValue: string) => {
//     setInputValue(inputValue);
//     if (latitude && longitude) fetchSupermarkets(inputValue, latitude, longitude);
//   };

//   const handleOptionChange = (selectedOption: SingleValue<SupermarketOption>) => {
//     setStoreName(selectedOption);
//   };

//   const customStyles: StylesConfig<SupermarketOption, false> = {
//     control: (provided) => ({
//       ...provided,
//       borderColor: '#ccc',
//       boxShadow: 'none',
//       '&:hover': {
//         borderColor: '#ff9800',
//       },
//     }),
//   };

//   return (
//     <div className='mx-auto max-w-4xl'>
//       <h1 className='my-5 flex justify-center text-2xl text-orange-600 font-bold'>商品を登録しよう！</h1>
//       <div className='flex justify-center mx-auto max-w-2xl py-8 shadow-lg'>
//         <form onSubmit={handleSubmit}>
//           <div className='w-full min-w-64 mb-4'>
//             <Select
//               options={options}
//               onChange={handleOptionChange}
//               onInputChange={handleInputChange}
//               placeholder="店舗名を選択"
//               className="w-full"
//               styles={customStyles}
//             />
//           </div>

//           {/* 商品入力フォーム */}
//           {products.map((product, index) => (
//             <div key={index} className="flex items-center mb-2">
//               <ProductInput
//                 key={index}
//                 product={product}
//                 onProductChange={(field, value) => handleProductChange(index, field, value)} onRemove={function (): void {
//                   throw new Error('Function not implemented.');
//                 } }              />
//               <button
//                 type="button"
//                 onClick={() => handleRemoveProduct(index)}
//                 className="border ml-4 mt-4 px-2 py-1 bg-orange-600 text-white font-bold rounded-md"
//               >
//                 削除
//               </button>
//             </div>
//           ))}

//           <div className="flex items-center mb-2">
//             <input
//               type="text"
//               placeholder="商品名"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className='border mt-5 mx-2 pl-2 py-2'
//             />
//             <input
//               type="number"
//               placeholder="価格"
//               value={price === 0 ? '' : price}
//               onChange={(e) => setPrice(parseFloat(e.target.value))}
//               required
//               className='border mt-5 mx-2 pl-2 py-2'
//             />
//             <label className='mt-5 mx-2'>
//               <input
//                 type="checkbox"
//                 checked={sale}
//                 onChange={(e) => setSale(e.target.checked)}
//                 aria-label="セール商品"
//               />
//               セール商品
//             </label>
//             <button
//               type="button"
//               onClick={handleAddProduct}
//               className='border ml-4 mt-4 px-3 py-1 bg-orange-600 text-white font-bold rounded-md'
//             >
//               +
//             </button>
//           </div>

//           <button
//             type="submit"
//             className='mx-60 border mt-5 py-2 px-2 bg-orange-600 text-white font-bold rounded-md'
//           >
//             登録する
//           </button>
//         </form>
//       </div>
//       {message && <p className='text-center text-red-500'>{message}</p>}
//     </div>
//   );
// };

// export default RegisterPrices;





import React from 'react';
import RegisterPricesForm from '@/components/RegisterPricesForm';

const RegisterPage: React.FC = () => (
  <div className='mx-auto max-w-4xl'>
    <h1 className='my-5 flex justify-center text-2xl text-orange-600 font-bold'>商品を登録しよう！</h1>
    <div className='flex justify-center mx-auto max-w-2xl'>
      <RegisterPricesForm />
    </div>
    <div className='bg-gray-100 h-auto max-h-max pb-12'>
      <div className='pt-4'>
        <h4 className='text-orange-600 flex justify-center text-4xl font-bold border-b border-gray-700 p-4'>使い方</h4>
      </div>
      <div className='grid grid-cols-4 gap-x-3 pt-8 mx-auto max-w-4xl'>
        <div className='p-6 shadow-xl rounded-3xl bg-white'>
          <h5 className='text-lg font-bold flex justify-center'>1.店舗を決める！</h5>
          <p>まずは、商品を登録したい店舗を入力しよう！</p>
        </div>
        <div className='p-6 shadow-xl rounded-3xl bg-white'>
          <h5 className='text-xl font-bold flex justify-center'>2.商品と価格！</h5>
          <p>続いて、登録したい商品名と、その価格を入力しよう！セールで割引されてる商品は、チェックを入れるのを忘れずに！</p>
        </div>
        <div className='p-6 shadow-xl rounded-3xl bg-white'>
          <h5 className='text-lg font-bold flex justify-center'>3.リストに追加！</h5>
          <p>商品の情報を入力できたら、＋ボタンでリストに追加しよう！</p>
        </div>
        <div className='p-6 shadow-xl rounded-3xl bg-white'>
          <h5 className='text-xl font-bold flex justify-center'>4.商品を登録！</h5>
          <p>いよいよ”登録する”ボタンで、商品を登録しよう！あなたが登録した情報で、みんなもお得にハッピー！</p>
        </div>
      </div>
    </div>
  </div>
);

export default RegisterPage;
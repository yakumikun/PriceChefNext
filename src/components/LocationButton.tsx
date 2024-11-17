import React from 'react';
import SupermarketList from './SupermarketList';
import useSupermarketSearch from '../hooks/useSupermarketSearch';

const LocationButton = () => {
    const { supermarkets, loading, error, searchComplete, searchSupermarkets } = useSupermarketSearch();

    return (
        <div className="flex flex-col items-center">
            <button 
                onClick={searchSupermarkets} 
                className='mt-10 mb-8 bg-orange-600 text-white px-8 py-4 rounded-lg font-bold'
            >
                現在地周辺から探す
            </button>
            {loading && <p className='flex justify-center font-bold text-orange-600'>Loading...</p>}
            {error && <p className='flex justify-center font-bold text-red-600'>{error}</p>}
            <div className="w-full">
                <SupermarketList supermarketsInfo={supermarkets} searchComplete={searchComplete} />
            </div>
        </div>
    );
};

export default LocationButton;





// import React, { useState } from 'react';
// import SupermarketList from './SupermarketList';

// interface Result {
//     place_id: string;
//     name: string;
//     geometry: {
//         location: {
//             lat: number;
//             lng: number;
//         };
//     };
// }

// interface Supermarket {
//     supermarketId: string;
//     name: string;
//     distance: string;
//     products: any[];
// }

// const LocationButton = () => {
//     const [supermarkets, setSupermarkets] = useState<Supermarket[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [searchComplete, setSearchComplete] = useState(false);

//     const handleSearch = () => {
//         setLoading(true);
//         setError('');
//         setSearchComplete(false);

//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const userLocation = {
//                         lat: position.coords.latitude,
//                         lng: position.coords.longitude,
//                     };
//                     const url = `/api/searchSupermarkets?lat=${userLocation.lat}&lng=${userLocation.lng}`;

//                     fetch(url)
//                         .then((response) => {
//                             if (!response.ok) {
//                                 throw new Error(`HTTP error! status: ${response.status}`);
//                             }
//                             return response.json();
//                         })
//                         .then((data: { results: Result[] }) => {

//                             console.log("APIレスポンス:", data);

//                             if (data.results && data.results.length > 0) {
//                                 const destinationLocations = data.results
//                                     .map((result) => `${result.geometry.location.lat},${result.geometry.location.lng}`)
//                                     .join('|');

//                                 const distanceUrl = `/api/searchDistance?origins=${userLocation.lat},${userLocation.lng}&destinations=${destinationLocations}`;

//                                 fetch(distanceUrl)
//                                     .then((response) => response.json())
//                                     .then((distanceData: { rows: { elements: { distance: { text: string, value: number } }[] }[] }) => {
//                                         const transformedSupermarkets = data.results.map((result, index) => ({
//                                             supermarketId: result.place_id,
//                                             name: result.name,
//                                             distance: distanceData.rows[0].elements[index].distance.text,
//                                             distanceValue: distanceData.rows[0].elements[index].distance.value,
//                                             products: [],
//                                         }));

//                                         transformedSupermarkets.sort((a, b) => a.distanceValue - b.distanceValue);

//                                         console.log("変換後のsuperketsデータ:", transformedSupermarkets);
//                                         setSupermarkets(transformedSupermarkets);
//                                     })
//                                     .catch((error) => {
//                                         console.error("Error fetching distances:", error);
//                                         setError("距離計算中にエラーが発生しました。");
//                                     });
//                             } else {
//                                 console.error("No supermarkets found.");
//                                 setError("周辺にスーパーマーケットが見つかりませんでした。");
//                             }
//                         })

//                         .catch((error) => {
//                             console.error("Error fetching supermarkets:", error);
//                             setError("スーパーマーケットの取得中にエラーが発生しました。");
//                         })
//                         .finally(() => {
//                             setLoading(false);
//                             setSearchComplete(true);
//                         });
//                 },
//                 (error) => {
//                     console.error("Geolocation error:", error);
//                     setError("位置情報の取得中にエラーが発生しました。");
//                     setLoading(false);
//                     setSearchComplete(true);
//                 }
//             );
//         } else {
//             console.error("Geolocation is not supported by this browser.");
//             setError("このブラウザは位置情報サービスをサポートしていません。");
//             setLoading(false);
//             setSearchComplete(true);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center">
//             <button onClick={handleSearch} className='mt-10 mb-8 bg-orange-600 text-white px-8 py-4 rounded-lg font-bold'>現在地周辺から探す</button>
//             {loading && <p className='flex justify-center font-bold text-orange-600'>Loading...</p>}
//             {error && <p className='flex justify-center font-bold text-red-600'>{error}</p>}
//             <div className="w-full">
//                 <SupermarketList supermarketsInfo={supermarkets} searchComplete={searchComplete} />
//             </div>
//         </div>
//     );
// };

// export default LocationButton;
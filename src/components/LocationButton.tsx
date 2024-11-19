import React from 'react';
import SupermarketList from './SupermarketList';
import useSupermarketSearch from '../hooks/useSupermarketSearch';

const LocationButton = () => {
    const { supermarkets, loading, error, searchComplete, searchSupermarkets } = useSupermarketSearch();

    return (
        <div className="flex flex-col items-center">
            <button 
                onClick={searchSupermarkets} 
                className='mt-10 mb-8 bg-orange-600 text-white px-8 py-4 rounded-xl font-bold'
            >
                現在地周辺から探す
            </button>
            {loading && <p className='flex justify-center font-bold text-orange-600 text-xl mb-4'>検索中...</p>}
            {error && <p className='flex justify-center font-bold text-red-600'>{error}</p>}
            <div className="w-full max-w-4xl mx-auto">
                <SupermarketList supermarketsInfo={supermarkets} searchComplete={searchComplete} />
            </div>
        </div>
    );
};

export default LocationButton;
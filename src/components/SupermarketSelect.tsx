import React from 'react';
import { SearchableSelect } from '../components/SearchableSelect';
import { useLocation } from '../hooks/useLocation'

interface SupermarketOption {
    value: string;
    label: string;
}

interface SupermarketSelectProps {
    onStoreSelect: (store: SupermarketOption | null) => void;
}

const SupermarketSelect: React.FC<SupermarketSelectProps> = ({ onStoreSelect }) => {
    const { latitude, longitude } = useLocation();

    const fetchSupermarkets = async (inputValue: string): Promise<SupermarketOption[]> => {
        if (!latitude || !longitude) return [];
        try {
          const response = await fetch(
            `/api/searchSupermarkets?query=${encodeURIComponent(inputValue)}&lat=${latitude}&lng=${longitude}`
          );
          const data = await response.json();
          return data.results
            ? data.results.map((result: { name: string; id: string }) => ({
                value: result.id,
                label: result.name,
              }))
            : [];
        } catch (error) {
          console.error('Error fetching supermarkets:', error);
          return [];
        }
};    
    return (
        <div className='max-w-4xl mb-4'>
        <SearchableSelect       
          options={[]}
          fetchOptions={fetchSupermarkets}
          onFocus={() => fetchSupermarkets('')}
          onChange={onStoreSelect}
          placeholder="店舗名を選択"
        />
      </div>
    );
};

export default SupermarketSelect;
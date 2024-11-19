import React, { useState, useEffect } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { useLocation } from '../hooks/useLocation'

interface SupermarketOption {
    value: string;
    label: string;
}

interface SupermarketSelectProps {
    onStoreSelect: (store: SupermarketOption | null) => void;
}

const SupermarketSelect: React.FC<SupermarketSelectProps> = ({ onStoreSelect }) => {
    const [isClient, setIsClient] = useState(false);
    const { latitude, longitude } = useLocation();
    

    useEffect(() => {
        setIsClient(true);
    }, []);

    const [options, setOptions] = useState<SupermarketOption[]>([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (latitude && longitude) {
            fetchSupermarkets(inputValue, latitude, longitude);
        }
    }, [inputValue, latitude, longitude]);

    if (!isClient) {
        return null;
    }

    const fetchSupermarkets = async (inputValue: string, lat: string | null, lng: string | null) => {
        if (!inputValue || !lat || !lng) return setOptions([]);

        try {
            const response = await fetch(`/api/searchSupermarkets?query=${encodeURIComponent(inputValue)}&lat=${latitude}&lng=${longitude}`);
            const data = await response.json();

            if (data.results) {
                setOptions(
                    data.results.map((result: { name: string, id: string }) => ({
                        value: result.id,
                        label: result.name,
                    }))
                );
            } else {
                setOptions([]);
            }
        } catch (error) {
            console.error('Error fetching supermarkets:', error);
            setOptions([]);
        }
    };

    const handleInputChange = (inputValue: string) => {
        setInputValue(inputValue);
    };

    const handleOptionChange = (selectedOption: SingleValue<SupermarketOption>) => {
        onStoreSelect(selectedOption);
    }

    const customStyles: StylesConfig<SupermarketOption, false> = {
        control: (provided) => ({
            ...provided,
            borderColor: '#ccc',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#ff9800',
            },
        }),
    };

    return (
        <div className='max-w-4xl mb-4'>
        <Select
          name='storeName'        
          options={options}
          onChange={handleOptionChange}
          onInputChange={handleInputChange}
          placeholder="店舗名を選択"
          className="w-full"
          styles={customStyles}
        />
      </div>
    );
};

export default SupermarketSelect;
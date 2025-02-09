import React, { useState, useEffect } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';

interface SearchableSelectProps<T> {
  options: T[];
  fetchOptions: (inputValue: string) => Promise<T[]>;
  placeholder: string;
  onChange: (selectedOption: SingleValue<T>) => void;
  onFocus?: () => void;
  inputValue?: string;
  customStyles?: StylesConfig<T, false>;
}

export function SearchableSelect<T extends { value: string; label: string }>({
  options: initialOptions,
  fetchOptions,
  placeholder,
  onChange,
  onFocus,
  inputValue: initialInputValue = '',
  customStyles,
}: SearchableSelectProps<T>) {
  const [options, setOptions] = useState<T[]>(initialOptions);
  const [inputValue, setInputValue] = useState(initialInputValue);

  useEffect(() => {
    const loadOptions = async () => {
      if (inputValue) {
        const fetchedOptions = await fetchOptions(inputValue);
        setOptions(fetchedOptions);
      } else {
        setOptions(initialOptions);
      }
    };
    loadOptions();
  }, [inputValue, fetchOptions, initialOptions]);

  return (
    <Select
      options={options}
      placeholder={placeholder}
      onInputChange={(value) => setInputValue(value)}
      onFocus={onFocus}
      onChange={onChange}
      styles={customStyles}
    />
  );
}
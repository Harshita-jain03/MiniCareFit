import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';

interface AsyncSelectFilterProps {
  label: string;
  name: string;
  value: string | undefined;
  onChange: (name: string, value: string) => void;
  loadOptionsUrl: string;
  searchKey?: string;
  labelKey?: string;
  valueKey?: string;
    page_size?: number;
}

const AsyncSelectFilter = ({
  label,
  name,
  value,
  onChange,
  loadOptionsUrl,
  page_size = 100000,
  searchKey = 'search',
  labelKey = 'name',
  valueKey = 'id',
}: AsyncSelectFilterProps) => {
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null);

  const loadOptions = async (inputValue: string) => {
    const res = await fetch(`${loadOptionsUrl}?page_size=${page_size}`);
    const data = await res.json();
    console.log('Fetched data:', data);
    const results = data.results;
    if (!Array.isArray(results) || results.length === 0) {
      return [];
    }
    const filteredOptions = results.filter((item: any) =>
      item[labelKey].toLowerCase().includes(inputValue.toLowerCase())
    );
    return filteredOptions.map((item: any) => ({
      label: item[labelKey],
      value: String(item[valueKey]),
    }));

  };

  // Fetch the selected label on mount if value is set
  useEffect(() => {
    const fetchDefaultLabel = async () => {
      if (value) {
        try {
          const res = await fetch(`${loadOptionsUrl}?page_size=${page_size}`);
          const data = await res.json();
          console.log('Fetched data:', data);
          const results = data.results;
          if (!Array.isArray(results) || results.length === 0) {
            setSelectedOption(null);
            return;
          }
          const result = results.find((item: any) => String(item[valueKey]) === value);
          
          setSelectedOption({
            label: result[labelKey],
            value: String(result[valueKey]),
          });
        } catch (err) {
          setSelectedOption(null);
        }
      } else {
        setSelectedOption(null);
      }
    };
    fetchDefaultLabel();
  }, [value, loadOptionsUrl, labelKey, valueKey]);

  return (
    <div style={{ minWidth: '200px' }}>
      <AsyncSelect
        placeholder={`All ${label}`}
        defaultOptions
        cacheOptions
        loadOptions={loadOptions}
        onChange={(option: any) => {
        console.log('Selected option:', option);
          setSelectedOption(option);
          onChange(name, option?.value || '');
        }}
        value={selectedOption}
        isClearable
      />
    </div>
  );
};

export default AsyncSelectFilter;

'use client';

import { useEffect, useState } from 'react';
import arrow from '../images/arrow-down-icon.svg'
import Image from 'next/image';

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  title: string;
  resetSelected?: boolean; // Optional prop to trigger reset
}
const Dropdown: React.FC<DropdownProps> = ({ options, onSelect ,title,resetSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (resetSelected) {
      setSelected(null); // Reset the selected state when resetSelected is true
    }
  }, [resetSelected]);

  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="px-4 py-2 text-[#5B6170] text-sm bg-white rounded-3xl border border-slate-400 flex items-center justify-between gap-3"
      >
        {selected || title}
        <span className="ml-2">
          <Image
            src={arrow}
            alt="Arrow"
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </span>
      </button>
      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {filteredOptions.length > 0 ? (
            <div>
              {filteredOptions.map((option) => (
                <p
                  key={option}
                  onClick={(e) => {
                    e.preventDefault(); 
                    handleSelect(option);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                >
                  {option}
                </p>
              ))}
            </div>
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

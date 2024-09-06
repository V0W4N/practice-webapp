'use client';

import Image from 'next/image';
import SearchManufacturer from './SearchManufacturer';
import { useState } from 'react';
import SearchButton from './SearchButton';

import {useRouter} from 'next/navigation';

const SearchBar = ({setManufacturer, setModel}) => {
    const [searchManufacturer, setSearchManufacturer] = useState("");
    const [searchModel, setSearchModel] = useState("");
  
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
        try{
            if (searchManufacturer.trim() === "" && searchModel.trim() === "") {
                return alert("Please provide some input");
            }
        }
        catch{
            return alert("Please provide some input");
        }
        
  
      setModel(searchModel);
      setManufacturer(searchManufacturer) 
    };
  
    return (
      <form className='searchbar' onSubmit={handleSearch}>
        <div className='searchbar__item'>
          <SearchManufacturer
            selected={searchManufacturer}
            setSelected={setSearchManufacturer}
          />
          <SearchButton otherClasses='sm:hidden' />
        </div>
        <div className='searchbar__item'>
          <Image
            src='/model-icon.png'
            width={25}
            height={25}
            className='absolute w-[20px] h-[20px] ml-4'
            alt='car model'
          />
          <input
            type='text'
            name='model'
            value={searchModel}
            onChange={(e) => setSearchModel(e.target.value)}
            placeholder='Tiguan...'
            className='searchbar__input'
          />
          <SearchButton otherClasses='sm:hidden' />
        </div>
        <SearchButton otherClasses='max-sm:hidden' />
      </form>
    );
  };
  
  export default SearchBar;
  
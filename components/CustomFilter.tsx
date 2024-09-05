'use client';

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { CustomFilterProps } from "@/types";
import { updateSearchParams } from "@/utils";

const CustomFilter = ({title, options}: CustomFilterProps) => {
  const [selected, setSelected] = useState(options[0])
  const router = useRouter()

  const handleUpdateParams = (e: {title: string, value:string}) => {
  const newPathName = updateSearchParams(title, e.value.toLowerCase())

  router.push(newPathName, {scroll: false})
  }

  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e)=>{
          setSelected(e);
          handleUpdateParams(e)
        }}
      >
        <div className='relative w-fit z-10'>
          <ListboxButton className='custom-filter__btn'>
            <span className='block truncate'>
              {selected.title}
            </span>
            <Image src='/chevron-up-down.svg' width={20} height={20} className='ml-4 object-contain' alt='chevron_up-down' />
          </ListboxButton>
          <Transition
            as={Fragment} 
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <ListboxOptions 
              anchor="bottom"
              className="w-[var(--button-width)] rounded-lg 
              border border-gray-100 bg-white 
              [--anchor-gap:var(--spacing-1)] 
              focus:outline-none cursor-pointer shadow-md z-20"
            >
              {options.map((option) => (
                <ListboxOption
                  key={option.title}
                  className= "data-[focus]:bg-blue-100"
                  
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block ml-2 truncate ${selected ? "font-bold" : "font-normal"}`} >
                        {option.title}
                      </span>
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
          </div>
      </Listbox>
    </div>
  );
}

export default CustomFilter
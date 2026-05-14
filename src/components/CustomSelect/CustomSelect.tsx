import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface CustomSelectProps {
  label: string;
  placeholder: string;
  options: string[] | number[];
  value: string | number;
  onChange: (value: T) => void;
  width?: string;
  isPrice?: boolean;
}

export default function CustomSelect({ 
  label, 
  placeholder, 
  options, 
  value, 
  onChange, 
  width = "204px",
  isPrice = false 
}: CustomSelectProps) {
  return (
    <div style={{ width }} className="flex flex-col gap-2 relative">
      <label className="text-[14px] leading-[18px] text-[#8A8A89] font-medium ml-1">
        {label}
      </label>

      <Listbox value={value } onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="z-99 relative w-full h-[48px] cursor-pointer rounded-[14px] bg-[#F7F7FB] px-4 text-left focus:outline-none text-[18px] font-medium text-[#121417]">
              <span className="block truncate">
                {value ? (isPrice ? `To ${value}$` : value) : placeholder}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                {open ? (
                  <ChevronUpIcon className="h-5 w-5 text-[#121417]" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-[#121417]" />
                )}
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options 
                style={{ width, height: '272px' }}
                className="select-options-container custom-scrollbar py-4"
              >
                {options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    value={option}
                    className={({ active, selected }) => `
                      relative cursor-pointer select-none py-2 px-[18px] text-[16px] leading-[20px] transition-colors
                      ${active || selected ? 'text-[#121417]' : 'text-[rgba(18,20,23,0.2)]'}
                      ${selected ? 'font-semibold' : 'font-medium'}
                    `}
                  >
                    {isPrice ? option : option}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}
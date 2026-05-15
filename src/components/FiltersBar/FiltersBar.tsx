"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchFilters } from "@/api/carsApi";
import { useState, useMemo } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import { FilterData } from "@/types";


export default function FiltersBar() {
  const router = useRouter();
  const searchParams = useSearchParams();


  const [brand, setBrand] = useState<string | "">(searchParams.get("brand") || "");
 
  const [price, setPrice] = useState<number | "">(
    searchParams.get("rentalPrice") ? Number(searchParams.get("rentalPrice")) : ""
  );
  
  const [minMileage, setMinMileage] = useState(searchParams.get("minMileage") || "");
  const [maxMileage, setMaxMileage] = useState(searchParams.get("maxMileage") || "");


const { data } = useQuery<FilterData>({
    queryKey: ["filters"],
    queryFn: fetchFilters,
    staleTime: Infinity,
  });

  const prices = useMemo(() => {
    if (!data?.price) return [];
    
    const { min, max } = data.price;
    const options = []; 
    for (let i = min; i <= max; i += 10) {
      options.push(i);
    }
    return options;
  }, [data]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (brand) params.set("brand", brand);
    if (price) params.set("rentalPrice", price.toString());
    if (minMileage) params.set("minMileage", minMileage);
    if (maxMileage) params.set("maxMileage", maxMileage);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-[16px] mb-12 mt-[84] items-end justify-center">
      
      <CustomSelect
        label="Car brand"
        placeholder="Choose a brand"
        options={data?.brands || []}
        value={brand}
        onChange={setBrand}
        width="204px"
      />

      <CustomSelect
        label="Price / 1 hour"
        placeholder="To $"
        options={prices}
        value={price}
        onChange={setPrice}
        width="196px"
        isPrice={true}
      />

     <div className="flex flex-col gap-2">
  <label className="text-[12px] leading-[1.33] text-gray-custom font-normal ml-1">
    Car mileage / km
  </label>
  <div className="flex">
  
    <div className="bg-inputs rounded-l-[12px] border-r border-gray-light px-[18px] py-[14px] flex items-center w-[160px] h-[44px]">
      <span className="text-main text-[16px] font-medium mr-2">From</span>
      <input
        type="text"
        value={minMileage}
        onChange={(e) => setMinMileage(e.target.value)}
    
        className="bg-transparent outline-none w-full text-main text-[16px] font-medium"
      />
    </div>


    <div className="bg-inputs rounded-r-[12px] px-[18px] py-[14px] flex items-center w-[160px] h-[44px]">
      <span className="text-main text-[16px] font-medium mr-2">To</span>
      <input
        type="text"
        value={maxMileage}
        onChange={(e) => setMaxMileage(e.target.value)}

        className="bg-transparent outline-none w-full text-main text-[16px] font-medium"
      />
    </div>
  </div>
</div>
  
      <button
        className="bg-btn hover:bg-btn-hover text-white w-[156] font-main h-[44] rounded-[12] font-semibold text-[16px] leading-[1.25] transition-colors duration-200"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
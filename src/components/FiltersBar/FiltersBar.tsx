"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchBrands } from "@/api/carsApi";
import { useState, useEffect } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";

export default function FiltersBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Стейт для брендів
  const [brand, setBrand] = useState<string | "">(searchParams.get("brand") || "");
  // Стейт для ціни (зберігаємо як число або порожній рядок)
  const [price, setPrice] = useState<number | "">(
    searchParams.get("rentalPrice") ? Number(searchParams.get("rentalPrice")) : ""
  );
  
  const [minMileage, setMinMileage] = useState(searchParams.get("minMileage") || "");
  const [maxMileage, setMaxMileage] = useState(searchParams.get("maxMileage") || "");

  // Завантаження брендів через React Query
  const { data: brands = [] } = useQuery<string[]>({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    staleTime: Infinity,
  });

  const prices = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (brand) params.set("brand", brand);
    if (price) params.set("rentalPrice", price.toString());
    if (minMileage) params.set("minMileage", minMileage);
    if (maxMileage) params.set("maxMileage", maxMileage);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-[18px] mb-12 items-end justify-center">
      
      <CustomSelect
        label="Car brand"
        placeholder="Choose a brand"
        options={brands}
        value={brand}
        onChange={setBrand}
        width="224px"
      />

      <CustomSelect
        label="Price / 1 hour"
        placeholder="To $"
        options={prices}
        value={price}
        onChange={setPrice}
        width="125px"
        isPrice={true}
      />

      <div className="flex flex-col gap-2">
        <label className="text-[#8A8A89] text-sm font-medium ml-1">
          Car mileage / km
        </label>
        <div className="flex">
          <input
            type="text"
            placeholder="From"
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
            className="bg-[#F7F7FB] rounded-l-[14px] border-r border-[rgba(18,20,23,0.05)] px-[18px] py-[14px] outline-none w-[160px] text-[#121417] text-[18px] font-medium"
          />
          <input
            type="text"
            placeholder="To"
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
            className="bg-[#F7F7FB] rounded-r-[14px] px-[18px] py-[14px] outline-none w-[160px] text-[#121417] text-[18px] font-medium"
          />
        </div>
      </div>

  
      <button
        className="bg-btn hover:bg-btn-hover text-white h-[48px] px-11 rounded-[12px] font-semibold text-[14px] leading-[20px] transition-colors duration-200"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
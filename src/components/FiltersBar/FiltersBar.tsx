"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchBrands } from "@/api/carsApi";
import { useState } from "react";

export default function FiltersBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [price, setPrice] = useState(searchParams.get("rentalPrice") || "");
  const [minMileage, setMinMileage] = useState(searchParams.get("minMileage") || "");
  const [maxMileage, setMaxMileage] = useState(searchParams.get("maxMileage") || "");

  const { data: brands, isLoading } = useQuery<string[]>({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    staleTime: Infinity,
  });

  const prices = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];


  const handleSearch = () => {
    const params = new URLSearchParams();

    if (brand) params.set("brand", brand);
    if (price) params.set("rentalPrice", price);
    if (minMileage) params.set("minMileage", minMileage);
    if (maxMileage) params.set("maxMileage", maxMileage);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-12 items-end justify-center">
      <div className="flex flex-col gap-2">
        <label className="text-[#8A8A89] text-sm font-medium ml-1">Car brand</label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)} 
          className="bg-[#F7F7FB] rounded-[14px] px-[18px] py-[14px] outline-none min-w-[224px] text-[#121417] font-medium appearance-none cursor-pointer"
        >
          <option value="">Choose car brand</option>
          {!isLoading &&
            brands?.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[#8A8A89] text-sm font-medium ml-1">Price / 1 hour</label>
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)} 
          className="bg-[#F7F7FB] rounded-[14px] px-[18px] py-[14px] outline-none min-w-[125px] text-[#121417] font-medium appearance-none cursor-pointer"
        >
          <option value="">To $</option>
          {prices.map((p) => (
            <option key={p} value={p.toString()}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[#8A8A89] text-sm font-medium ml-1">Car mileage / km</label>
        <div className="flex">
          <input
            type="text"
            placeholder="From"
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
            className="bg-[#F7F7FB] rounded-l-[14px] border-r border-[#rgba(18,20,23,0.05)] px-[18px] py-[14px] outline-none w-[160px] text-[#121417] font-medium"
          />
          <input
            type="text"
            placeholder="To"
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
            className="bg-[#F7F7FB] rounded-r-[14px] px-[18px] py-[14px] outline-none w-[160px] text-[#121417] font-medium"
          />
        </div>
      </div>
      <button
        className="bg-[#3470FF] hover:bg-[#0B44CD] transition-colors text-white px-11 py-[14px] rounded-[12px] font-semibold text-sm h-[48px]"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
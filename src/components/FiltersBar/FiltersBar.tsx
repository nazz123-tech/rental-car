"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchBrands } from "@/api/carsApi";

export default function FiltersBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: brands, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    staleTime: Infinity,
  });

  const prices = Array.from({ length: 8 }, (_, i) => (i + 3) * 10);

  const updateFilter = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-12 items-end justify-center">
      <div className="flex flex-col gap-2">
        <label className="text-[#8A8A89] text-sm font-medium ml-1">
          Car brand
        </label>
        <select
          value={searchParams.get("make") || ""}
          onChange={(e) => updateFilter("make", e.target.value)}
          className="bg-[#F7F7FB] rounded-[14px] px-[18px] py-[14px] outline-none min-w-[224px] text-[#121417] font-medium appearance-none cursor-pointer"
        >
          <option value="">Choose car brand</option>
          {!isLoading &&
            brands?.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[#8A8A89] text-sm font-medium ml-1">
          Price / 1 hour
        </label>
        <div className="relative">
          <select
            value={searchParams.get("rentalPrice") || ""}
            onChange={(e) => updateFilter("rentalPrice", e.target.value)}
            className="bg-[#F7F7FB] rounded-[14px] px-[18px] py-[14px] outline-none min-w-[125px] text-[#121417] font-medium appearance-none cursor-pointer"
          >
            <option value="">To $</option>
            {prices.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[#8A8A89] text-sm font-medium ml-1">
          Car mileage / km
        </label>
        <div className="flex">
          <input
            type="text"
            placeholder="From"
            value={searchParams.get("minMileage") || ""}
            onChange={(e) => updateFilter("minMileage", e.target.value)}
            className="bg-[#F7F7FB] rounded-l-[14px] border-r border-[#rgba(18,20,23,0.05)] px-[18px] py-[14px] outline-none w-[160px] text-[#121417] font-medium"
          />
          <input
            type="text"
            placeholder="To"
            value={searchParams.get("maxMileage") || ""}
            onChange={(e) => updateFilter("maxMileage", e.target.value)}
            className="bg-[#F7F7FB] rounded-r-[14px] px-[18px] py-[14px] outline-none w-[160px] text-[#121417] font-medium"
          />
        </div>
      </div>

      <button
        className="bg-[#3470FF] hover:bg-[#0B44CD] transition-colors text-white px-11 py-[14px] rounded-[12px] font-semibold text-sm h-[48px]"
        onClick={() => {}}
      >
        Search
      </button>
    </div>
  );
}

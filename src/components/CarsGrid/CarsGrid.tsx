"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCars } from "@/api/carsApi";
import CarCard from "../CarCard/CarCard";
import { Car, CarFilters } from "@/types";
import { Loader } from "@/app/loader";

export default function CarsGrid() {
  const searchParams = useSearchParams();

  const filters: CarFilters = {
    brand: searchParams.get("brand") || "",
    price: searchParams.get("rentalPrice") || "",
    minMileage: searchParams.get("minMileage") || "",
    maxMileage: searchParams.get("maxMileage") || "",
  };

  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, isError} =
    useInfiniteQuery({
      queryKey: ["cars", filters] as const,
      queryFn: ({ pageParam = 1, queryKey }) =>
        fetchCars({ pageParam, queryKey: queryKey as [string, CarFilters] }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 12 ? allPages.length + 1 : undefined;
      },
    });

  if (isError) {
    return (
      <p className="text-center py-10 font-semibold text-red-500">Something went wrong...</p>
    );
  }
  

  return (
    <section>
      {isLoading ? 
      <Loader></Loader>
       : <div className="w-[1440] px-[120] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-12 mb-24">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.map((car: Car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </React.Fragment>
        ))}
      </div>
      }
      

      {hasNextPage && (
        <div className="flex justify-center pb-20">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="text-black font-medium border border-btn rounded-xl hover:border-btn-hover py-[12] px-[51] disabled:text-gray-400 transition-colors cursor-pointer"
          >
            {isFetchingNextPage ? <Loader/> : "Load more"}
          </button>
        </div>
      )}

      {!hasNextPage && data?.pages[0].length === 0 && (
        <p className="text-center text-gray-500">
          No cars found for your request.
        </p>
      )}
    </section>
  );
}

import { Suspense } from "react";
import CarsGrid from "@/components/CarsGrid/CarsGrid";
import FiltersBar from "@/components/FiltersBar/FiltersBar";
import { CarsGridSkeleton, FiltersSkeleton } from "@/components/Skeletons/Skeletons";

export default function CatalogPage() {
  return (
    <>
      <Suspense
        fallback={
        <FiltersSkeleton/>
        }
      >
        <FiltersBar />
      </Suspense>

      <Suspense
        fallback={
           <CarsGridSkeleton/>
        }
      >
        <CarsGrid />
      </Suspense>
    </>
      
    
  );
}

import { Suspense } from "react";
import CarsGrid from "@/components/CarsGrid/CarsGrid";
import FiltersBar from "@/components/FiltersBar/FiltersBar";
import { Loader } from "../loader";

export default function CatalogPage() {
  return (
    <>
      <Suspense
        fallback={
          <Loader/>  
        }
      >
        <FiltersBar />
      </Suspense>

      <Suspense
        fallback={
          <Loader/>  
        }
      >
        <CarsGrid />
      </Suspense>
    </>
      
    
  );
}

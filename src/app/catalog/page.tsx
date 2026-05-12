import { Suspense } from "react";
import CarsGrid from "@/components/CarsGrid/CarsGrid";
import FiltersBar from "@/components/FiltersBar/FiltersBar";
import { Loader } from "../loader";

export default function CatalogPage() {
  return (
    <main className="container mx-auto px-4 pt-12">
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
    </main>
  );
}

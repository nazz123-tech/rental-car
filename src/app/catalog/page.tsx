import { Suspense } from "react";
import CarsGrid from "@/components/CarsGrid/CarsGrid";
import FiltersBar from "@/components/FiltersBar/FiltersBar";

export default function CatalogPage() {
  return (
    <main className="container mx-auto px-4 pt-12">
      <Suspense
        fallback={
          <div className="h-20 w-full bg-gray-100 animate-pulse rounded-xl mb-12" />
        }
      >
        <FiltersBar />
      </Suspense>

      <Suspense
        fallback={
          <div className="text-center py-20 font-medium text-lg">
            Loading catalog...
          </div>
        }
      >
        <CarsGrid />
      </Suspense>
    </main>
  );
}

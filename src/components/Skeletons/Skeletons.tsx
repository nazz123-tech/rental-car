
export const FiltersSkeleton = () => (
  <div className="flex flex-wrap gap-4 items-end animate-pulse mb-10 w-[1440] mx-auto">
    <div className="flex flex-col gap-2">
      <div className="h-4 bg-gray-200 rounded w-16 ml-1" />
      <div className="h-[44px] w-[204px] bg-gray-200 rounded-[12px]" />
    </div>
    <div className="flex flex-col gap-2">
      <div className="h-4 bg-gray-200 rounded w-20 ml-1" />
      <div className="h-[44px] w-[196px] bg-gray-200 rounded-[12px]" />
    </div>
    <div className="flex flex-col gap-2">
      <div className="h-4 bg-gray-200 rounded w-24 ml-1" />
      <div className="h-[44px] w-[320px] bg-gray-200 rounded-[12px]" />
    </div>
    <div className="h-[44px] w-[136px] bg-gray-200 rounded-[12px]" />
  </div>
);


export const CarsGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-12 w-[1440] mx-auto">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="flex flex-col gap-4 animate-pulse">
        <div className="w-full h-[268px] bg-gray-200 rounded-[14px]" />
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-5 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-[44px] bg-gray-200 rounded-[12px] w-full mt-2" />
      </div>
    ))}
  </div>
);
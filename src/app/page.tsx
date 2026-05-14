"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <section 
      className="w-full min-h-[calc(100vh-68px)] bg-[url('/Picture.jpg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-end mx-auto"
    >
      <div className="flex flex-col pb-[80px] items-center text-center">
        <h1 className="text-white/90 font-bold text-[60px] leading-[1.2] mb-[16px]">
          Find your perfect rental car
        </h1>

        <p className="font-main text-[24px] text-white mb-[40px] font-semibold leading-[1.33]">
          Reliable and budget-friendly rentals for any journey
        </p>

        <button
          onClick={() => {
            router.push("/catalog");
          }}
          className="bg-btn hover:bg-btn-hover text-white rounded-[12px] font-main text-base transition-colors duration-200 w-[276px] h-[44px] flex items-center justify-center"
        >
          View Catalog
        </button>
      </div>
    </section>
  );
}
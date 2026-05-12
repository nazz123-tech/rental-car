"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <section className="w-[1440] h-[700] bg-[url('/Picture.jpg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-end mx-auto">
        <div className="flex flex-col pb-[60] items-center">
          <h1 className="text-white/90 font-bold text-[60px] leading-[1.2]">
            Find your perfect rental car
          </h1>

          <p className="font-main text-[24px] text-white mb-[40] font-semibold leading-[1.33]">
            Reliable and budget-friendly rentals for any journey
          </p>
          <button
            onClick={() => {
              router.push("/catalog");
            }}
            className="bg-btn hover:bg-btn-hover text-white rounded-[12] font-main text-base transition-colors duration-200 w-[276] h-[44]"
          >
            View Catalog
          </button>
        </div>
      </section>
    </>
  );
}

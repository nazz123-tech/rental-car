import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types";

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="flex flex-col h-full">
      <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4 bg-gray-100">
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex justify-between items-center mb-2 font-medium">
        <span>
          {car.brand} <span className="text-btn">{car.model}</span>,{" "}
          {car.year}
        </span>
        <span>${car.rentalPrice}</span>
      </div>

      <p className="text-xs text-gray-500 mb-6 truncate">
        {car.address} | {car.rentalCompany} | {car.type}
      </p>

      <Link
        href={`/catalog/${car.id}`}
        target="_blank"
        className="w-full py-3 bg-btn text-white text-center rounded-xl font-semibold hover:bg-btn-hover mt-auto"
      >
        Read more
      </Link>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types";
import { IoMdHeartEmpty , IoMdHeart} from "react-icons/io";
import { toast } from "react-toastify";
import { useState } from "react";

export default function CarCard({ car }: { car: Car }) {
  const [isFavourite, setIsFavourite]=useState(false);

  const addressParts = (car.address || "").split(",").map(part => part.trim());
  const address=addressParts[0]|| "";
  const city = addressParts[1] || "";
  const country = addressParts[2] || ""; 

  const toggleHeart = (e:React.MouseEvent)=>{
    e.preventDefault();
    setIsFavourite(!isFavourite);
    if(!isFavourite){
     toast.success("Added to favourites")
   }
  }
  // 
  return (
    <div className="flex flex-col h-full">
      <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4 bg-gray-100">
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className="object-cover"
          fill
        />
        <button
          onClick={toggleHeart}
          className="absolute top-4 right-4 z-10 bg-transparent border-none cursor-pointer outline-none"
        >
          {isFavourite ? (
            <IoMdHeart size={18} className="text-btn" />
          ) : (
            <IoMdHeartEmpty size={18} className="text-white/80" /> 
          )}
        </button>
      </div>

      <div className="flex justify-between items-center mb-2 font-medium">
        <span>
          {car.brand} <span className="text-btn">{car.model}</span>,{" "}
          {car.year}
        </span>
        <span>${car.rentalPrice}</span>
      </div>

      <p className="text-xs text-gray-500 mb-[4] truncate">
        {address} | {city} | {country}
      </p>
      <p className="text-xs text-gray-500 mb-6 truncate">
      {car.type} | {car.mileage}
      </p>
      

      <Link
        href={`/catalog/${car.id}`}
        target="_blank"
        className="w-full py-3 bg-btn text-white text-center rounded-xl font-semibold hover:bg-btn-hover mt-auto transition-colors duration-200"
      >
        Read more
      </Link>
    </div>
  );
}

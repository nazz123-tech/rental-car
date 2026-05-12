"use client"; 

import { useQuery } from "@tanstack/react-query";
import { fetchCarById } from '@/api/carsApi';
import { notFound } from "next/navigation";
import { Loader } from "@/app/loader";
import Image from "next/image";
type Props = {
  carId: string;
};

const CarDetails = ({ carId }: Props) => {
  const { data: car,isError,isLoading } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => fetchCarById(carId),
    refetchOnMount: false,
  });
const carOptions = [
  ...(car?.accessories ?? []),
  ...(car?.functionalities ?? [])
];

  if (!car){
    notFound()
  }

    if (isLoading) {
    return <Loader/>
  }
  if (isError) {
    return <p>Something went wrong.</p>
  }
  return (
    <>
        <div>
            <Image
                src={car.img}
                     alt={`${car.brand} ${car.model}`}
                      fill
                      className="object-cover"
            />
            {/* Form */}
        </div>
        <div>
            <div>
                <h2>{car.brand} {car.model}, {car.year} <span>{car.id}</span></h2>
                <div>
                    <svg></svg>
                    <p>{car.address}</p>
                    <p>{car.mileage} </p>
                </div>
                <p>{car.rentalPrice}</p>
                <p>{car.description}</p>
            </div>
            <div>
                <h2>Rental Conditions</h2>
                <ul>
                {car.rentalConditions.map((index,item)=>
                    <li key={index}>{item}</li>
                )}   
                </ul>
            </div>
            <div>
                <h2>Car Specs</h2>
                <ul>
                    <li>{car.year}</li>
                    <li>{car.type}</li>
                    <li>{car.fuelConsumption}</li>
                    <li>{car.engineSize}</li>
                </ul>
            </div>
            <div>
                <ul>
                    {carOptions.map((index,item)=>
                        <li key={index}>{item}</li>
                    )}
                </ul>
            </div>
        </div>
    </>
  );
};

export default CarDetails;
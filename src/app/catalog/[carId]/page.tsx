"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCarById } from '@/api/carsApi';
import { notFound } from "next/navigation";
import { Loader } from "@/app/loader";
import Image from "next/image";

type PageProps = {
  params: Promise<{ carId: string }>;
};

const CarDetails = ({ params }: PageProps) => {
  const { carId } = React.use(params);

  const { data: car, isError, isLoading } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => fetchCarById(carId),
    enabled: !!carId,
  });

  if (isLoading) return <Loader />;
  if (isError || !car) notFound();

  const carOptions = [
    ...(car.accessories ?? []),
    ...(car.functionalities ?? [])
  ];

  return (
    <div>
      <div>
        <Image 
          src={car.img} 
          alt={car.model} 
          width={800} 
          height={400} 
        />
      </div>
      
      <h1>
        {car.brand} {car.model}, {car.year}
      </h1>

      <div>
        <p>{car.address}</p>
        <p>{car.mileage} km</p>
        <p>{car.rentalPrice}</p>
      </div>

      <p>{car.description}</p>

      <div>
        <h2>Rental Conditions</h2>
        <ul>
          {car.rentalConditions.map((condition, index) => (
            <li key={index}>{condition}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Car Specs</h2>
        <ul>
          <li>Year: {car.year}</li>
          <li>Type: {car.type}</li>
          <li>Fuel: {car.fuelConsumption}</li>
          <li>Engine: {car.engineSize}</li>
        </ul>
      </div>

      <div>
        <h2>Accessories & Functionalities</h2>
        <ul>
          {carOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarDetails;
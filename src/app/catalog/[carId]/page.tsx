"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCarById } from "@/api/carsApi";
import { notFound } from "next/navigation";
import { Loader } from "@/app/loader";
import Image from "next/image";
import BookingForm from "@/components/BookingForm/BookingForm";


type PageProps = {
  params: Promise<{ carId: string }>;
};

const CarDetails = ({ params }: PageProps) => {
  const { carId } = React.use(params);

  const {
    data: car,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => fetchCarById(carId),
    enabled: !!carId,
  });

  if (isLoading) return <Loader />;
  if (isError || !car) notFound();

  const carOptions = [
    ...(car.accessories ?? []),
    ...(car.functionalities ?? []),
  ];

  return (
    <div className="flex flex-row gap-[72] mx-auto w-[1440] px-[120] pt-[84]">
      <div className="flex flex-col gap-[40]">
        <Image src={car.img} alt={car.model} width={640} height={512} className="rounded-[19px]" />
        <BookingForm/>
      </div>
      <div>
        <div>
          <h1>
            {car.brand} {car.model}, {car.year}
          </h1>

          <div>
            <p></p>
            <p>{car.mileage} km</p>
            <p>{car.rentalPrice}</p>
          </div>
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
    </div>
  );
};

export default CarDetails;

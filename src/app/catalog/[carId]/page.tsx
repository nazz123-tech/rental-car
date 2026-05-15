"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCarById } from "@/api/carsApi";
import { notFound } from "next/navigation";
import { Loader } from "@/app/loader";
import Image from "next/image";
import BookingForm from "@/components/BookingForm/BookingForm";
import { MdOutlinePlace, MdDoneOutline } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { FaCarSide } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { TbEngineFilled } from "react-icons/tb";


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


  return (
    <div className="flex flex-row gap-[72] mx-auto w-[1440] px-[120] pt-[84]">
      <div className="flex flex-col gap-[40]">
        <Image
          src={car.img}
          alt={car.model}
          width={640}
          height={512}
          className="rounded-[19px]"
        />
        <BookingForm carId={car.id} />
      </div>
      <div className="mt-[20]">
        <div>
          <div className="flex flex-row gap-[16] text-[16] leading-1.25 text-gray-custom items-baseline-last">
            <h1 className="font-semibold text-2xl leading-[1.33] text-main">
              {car.brand} {car.model}, {car.year}
            </h1>
            <span>Id: {car.id.slice(0, 4)}</span>
          </div>

          <div className="flex flex-row gap-[16] mt-[8]">
            <p className="flex flex-row items-center font-medium text-main text-[16] leading-1.25">
              <MdOutlinePlace /> {car.location.city}, {car.location.country}
            </p>
            <p className="font-medium text-main text-[16]">
              Mileage: {car.mileage} km
            </p>
          </div>
          <p className="font-semibold text-[24px] text-btn leading-1.33 mt-[16] mb-[32]">
            ${car.rentalPrice}
          </p>
        </div>
        <p className="font-medium text-[16] leading-[1.25] text-main mb-[68]">
          {car.description}
        </p>
        <div className="flex flex-col gap-[110]">
          <div>
            <h2 className="font-semibold text-[20px] leading-[1.2] text-main mb-[20]">
              Rental Conditions:
            </h2>
            <ul className="flex flex-col gap-[16]">
              {car.rentalConditions.map((condition, index) => (
                <li
                  className="font-medium text-[16] text-main leading-[1.25] flex flex-row items-center"
                  key={index}
                >
                  <MdDoneOutline className="mr-[8]" />
                  {condition}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-[20px] leading-[1.2] text-main mb-[20]">
              Car Specifications:
            </h2>
            <ul className="flex flex-col gap-[16]">
              <li className="font-medium text-[16] text-main leading-[1.25] flex flex-row items-center">
                <SlCalender className="mr-[8]" />
                Year: {car.year}
              </li>
              <li className="font-medium text-[16] text-main leading-[1.25] flex flex-row items-center">
                <FaCarSide className="mr-[8]" />
                Type: {car.type}
              </li>
              <li className="font-medium text-[16] text-main leading-[1.25] flex flex-row items-center">
                <BsFillFuelPumpFill className="mr-[8]" />
                Fuel: {car.fuelConsumption}
              </li>
              <li className="font-medium text-[16] text-main leading-[1.25] flex flex-row items-center">
                <TbEngineFilled className="mr-[8]" />
                Engine: {car.engine}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-[20px] leading-[1.2] text-main mb-[20]">
              Accessories & Functionalities
            </h2>
            <ul className="flex flex-col gap-[16]">
              {car.features.map((feature, index) => (
                <li
                  className="font-medium text-[16] text-main leading-[1.25] flex flex-row items-center"
                  key={index}
                >
                  <MdDoneOutline className="mr-[8]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;

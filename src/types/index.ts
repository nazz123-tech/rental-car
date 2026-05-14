export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: number;
  rentalCompany: string;
  address:string;
  rentalConditions: string[];
  mileage: number;
}

export interface CarFilters {
  brand?: string;
  rentalPrice?: string; 
  minMileage?: string;
  maxMileage?: string;
}
export interface BookingPayload {
  name: string;
  email: string;
  comment?:string;
}



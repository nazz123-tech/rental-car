import axios from 'axios';
import { Car, CarFilters, BookingPayload } from '@/types';

interface FetchCarsArgs {
  pageParam?: number;
  queryKey: [string, CarFilters];
}

interface ApiResponse {
  cars: Car[];

}

const API_URL = 'https://car-rental-api.goit.global';

export const fetchCars = async ({ pageParam = 1, queryKey }: FetchCarsArgs): Promise<Car[]> => {
  const [, filters] = queryKey;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { data } = await axios.get<ApiResponse>(`${API_URL}/cars`, {
    params: {
      page: pageParam,
      limit: 12,
      brand: filters.brand|| undefined,
      rentalPrice: filters.rentalPrice || undefined,
      minMileage: filters.minMileage || undefined,
      maxMileage: filters.maxMileage || undefined,
    },
  });

  return data.cars;
};
export const fetchBrands = async () : Promise<string[]>=>{
    const response = await axios.get(`${API_URL}/brands`)
    return response.data;
}
export const fetchCarById = async (id: string): Promise<Car> => {
const response = await axios.get<Car>(`${API_URL}/cars/${id}`);
  return response.data;
};


export const placeBooking = async (
  carId: string,
  payload: BookingPayload,
) => {
  const { data } = await axios.post(`${API_URL}/cars/${carId}/booking-requests`, payload);

  return data;
};
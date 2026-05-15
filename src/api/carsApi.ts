import axios from 'axios';
import { Car, CarFilters, BookingPayload } from '@/types';
import { FilterData } from '@/types';

interface FetchCarsArgs {
  pageParam?: number;
  queryKey: [string, CarFilters];
}

interface ApiResponse {
  cars: Car[];

}

const API_URL = 'https://car-rental-api.goit.study';

export const fetchCars = async ({ pageParam = 1, queryKey }: FetchCarsArgs): Promise<Car[]> => {
  const [, filters] = queryKey;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { data } = await axios.get<ApiResponse>(`${API_URL}/cars`, {
    params: {
      page: pageParam,
      perPage: 12,
      brand: filters.brand|| undefined,
      price: filters.price || undefined,
      minMileage: filters.minMileage || undefined,
      maxMileage: filters.maxMileage || undefined,
    },
  });

  return data.cars;
};
export const fetchFilters = async () : Promise<FilterData>=>{
    const response = await axios.get(`${API_URL}/cars/filters`)
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
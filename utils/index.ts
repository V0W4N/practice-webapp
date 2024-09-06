import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
    const headers ={
        'x-rapidapi-key': '7eb590dc54msh6441347369b92dbp16bb33jsn985833915b93',
		'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const {manufacturer, year, model, limit, fuel} = filters;
    const url = new URL('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla')
    
    url.searchParams.append("make", manufacturer);
    url.searchParams.append("year", `${year}`);
    url.searchParams.append("model", model);
    url.searchParams.append("limit", `${limit}`);
    url.searchParams.append("fuel_type", fuel);

    const response = await fetch(url,
        {headers: headers});
    const result = await response.json();
    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };


  export const generateCarImageUrl =
  (car: CarProps, angle? :string) =>
  {
    const url = new URL('localhost') 
    // i hope that one service approves me 💀💀
    const {make, year, model} = car;
    url.searchParams.append("customer", "KEY");
    url.searchParams.append('make', make)
    url.searchParams.append('modelFamily', model.split(" ")[0])
    url.searchParams.append('zoomType', 'fullscreen')
    url.searchParams.append('modelYear', `${year}`)
    url.searchParams.append('angle', `${angle}`)
    return `${url}`
  }

  export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    
    searchParams.set(type, value)
    const newPathName = `${window.location.pathname}?${searchParams.toString()}`

    return newPathName
  }
import axios from "axios";
import type { Country } from "../types/country";



const API_BASE_URL = "http://localhost:5000";

//get All Countries GET /countries

export const getAllCountries = async (): Promise<Country[]> => {
  try {
    const { data } = await axios.get<Country[]>(`${API_BASE_URL}/countries`);
    return data;
  } catch (error) {
    console.error("Error fetching countries from backend:", error);
    throw error;
  }
};

//get countries by code  GET /countries/:code

export const getCountryByCode = async (code: string): Promise<Country[]> => {
  try {
    const { data } = await axios.get<Country[]>(
      `${API_BASE_URL}/countries/${code}`
    );
    return data;
  } catch (error) {
    console.error(`Error fetching country ${code} from backend:`, error);
    throw error;
  }
};

// get Countries By Region  GET /countries/region/:region

export const getCountriesByRegion = async (
  region: string
): Promise<Country[]> => {
  try {
    const { data } = await axios.get<Country[]>(
      `${API_BASE_URL}/countries/region/${region}`
    );
    return data;
  } catch (error) {
    console.error(
      `Error fetching country by region ${region} from backend:`,
      error
    );
    throw error;
  }
};

// search Countries GET /countries/search?params= sfsf
export const searchCountries = async (params: {
  name?: string;
  capital?: string;
  region?: string;
  timezone?: string;
}): Promise<Country[]> => {
  try {
    const queryParams = new URLSearchParams();

    if (params.name) queryParams.append("name", params.name);
    if (params.capital) queryParams.append("capital", params.capital);
    if (params.region) queryParams.append("region", params.region);
    if (params.timezone) queryParams.append("timezone", params.timezone);

    const { data } = await axios.get<Country[]>(
      `${API_BASE_URL}/countries/search?${queryParams.toString()}`
    );
    return data;
  } catch (error) {
    console.error("Error searching countries from backend:", error);
    throw error;
  }
};

import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";

//get only required data from the API
const FIELDS =
  "name,cca2,population,region,capital,flags,currencies,languages,timezones";

export interface CountryData {
  name: {
    common: string;
    official: string;
    // nativeName?: { [key: string]: { official: string; common: string } };
  };
  cca2: string;
  population: number;
  region: string;
  capital?: string[];
  flags: {
    png: string;
    svg: string;
  };
  currencies?: { [key: string]: { name: string; symbol?: string } };
  languages?: { [key: string]: string };
  timezones?: string[];
}

let countriesCache: CountryData[] | null = null;
const CACHE_DURATION = 10 * 60 * 1000;
let cacheTimestamp: number | null = null;

//get all countries
export const fetchAllCountries = async (): Promise<CountryData[]> => {
  try {
    const response = await axios.get<CountryData[]>(
      `${BASE_URL}/all?fields=${FIELDS}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all countries:", error);
    throw error;
  }
};

//return cahched coutnres data
export const getAllCountriesCached = async (): Promise<CountryData[]> => {
  const now = Date.now();
  if (
    countriesCache &&
    cacheTimestamp &&
    now - cacheTimestamp < CACHE_DURATION
  ) {
    console.log("Returning cached data for all countries");
    return countriesCache;
  }

  try {
    console.log("Fetching fresh data for all countries");
    countriesCache = await fetchAllCountries();
    cacheTimestamp = now;
    return countriesCache;
  } catch (error) {
    console.error("Error fetching fresh data, unable to update cache:", error);
    throw error;
  }
};

//get country using code
export const fetchCountryByCode = async (
  code: string
): Promise<CountryData[]> => {
  try {
    const { data } = await axios.get<CountryData[]>(
      `${BASE_URL}/alpha/${code}`
    );
    return data;
  } catch (error) {
    console.error(`Error fetching country by code ${code}:`, error);
    throw error;
  }
};

export const fetchCountriesByRegion = async (
  region: string
): Promise<CountryData[]> => {
  try {
    const { data } = await axios.get<CountryData[]>(
      `${BASE_URL}/region/${region}?fields=${FIELDS}`
    );
    return data;
  } catch (error) {
    console.error(`Error fetching country by region ${region}:`, error);
    throw error;
  }
};

export const searchCountries = async (params: {
  name?: string;
  capital?: string;
  region?: string;
  timezone?: string;
}): Promise<any[]> => {
  try {
    const allCountries = await fetchAllCountries();

    return allCountries.filter((country: any) => {
      if (
        params.name &&
        !country.name.common
          .toLowerCase()
          .includes(params.name.toLowerCase()) &&
        !country.name.official.toLowerCase().includes(params.name.toLowerCase())
      ) {
        return false;
      }

      if (
        params.capital &&
        country.capital &&
        !country.capital.some((c: string) =>
          c.toLowerCase().includes(params.capital!.toLowerCase())
        )
      ) {
        return false;
      }

      if (
        params.region &&
        country.region.toLowerCase() !== params.region.toLowerCase()
      ) {
        return false;
      }

      if (
        params.timezone &&
        country.timezones &&
        !country.timezones.includes(params.timezone)
      ) {
        return false;
      }

      return true;
    });
  } catch (error) {
    throw error;
  }
};

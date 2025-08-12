import { Request, Response } from "express";
import {
  CountryData,
  fetchCountryByCode,
  fetchCountriesByRegion,
  getAllCountriesCached,
  searchCountries,
} from "../services/countryServices";

// Controller to get a list of all countries.
export const getAllCountries = async (req: Request, res: Response) => {
  try {
    const countries: CountryData[] = await getAllCountriesCached();
    console.log(`Fetched ${countries.length} countries`);
    res.status(200).json(countries);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching countries", error: error.message });
  }
};

//  Controller to get information for a single country by its code.

export const getCountryByCode = async (req: Request, res: Response) => {
  try {
    //country code from reqtest
    const { code } = req.params;

    //validate code
    if (!code) {
      return res
        .status(400)
        .json({ message: "Bad Request: Country code is required" });
    }

    const countries: CountryData[] = await fetchCountryByCode(code);

    const country = countries[0];

    if (!country) {
      console.warn(`Country not found for code: ${code}`);
      return res.status(404).json({ message: "Country not found" });
    }
    res.status(200).json(country);
  } catch (error: any) {
    console.error(error);
    if (error.response?.status === 404) {
      res.status(404).json({ message: "Country not found" });
    } else {
      res.status(500).json({
        message: "Error fetching country details",
        error: error.message,
      });
    }
  }
};

// get a list of countries filtered by region
export const getCountriesByRegion = async (req: Request, res: Response) => {
  try {
    // region from the request parameters
    const { region } = req.params;

    //regino validation
    if (!region) {
      return res.status(400).json({ message: "region is required" });
    }

    const countries: CountryData[] = await fetchCountriesByRegion(region);

    if (!countries) {
      return res.status(404).json({ message: "Countriees not found" });
    }
    res.status(200).json(countries);
  } catch (error: any) {
    console.error(error);
    if (error.response?.status === 404) {
      res.status(404).json({ message: "Country not found" });
    } else {
      res.status(500).json({
        message: "Error fetching country details",
        error: error.message,
      });
    }
  }
};

export const searchCountriesHandler = async (req: Request, res: Response) => {
  try {
    const { name, capital, region, timezone } = req.query;

    if (!name && !capital && !region && !timezone) {
      return res.status(400).json({
        error:
          "Please provide at least one search parameter (name, capital, region, or timezone)",
      });
    }

    const countries = await searchCountries({
      name: name as string,
      capital: capital as string,
      region: region as string,
      timezone: timezone as string,
    });

    if (countries.length === 0) {
      return res.status(404).json({
        message: "No countries found matching the search criteria",
      });
    }

    res.json(countries);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Failed to search countries" });
  }
};

import express, { Router } from "express";

import {
  getAllCountries,
  getCountriesByRegion,
  getCountryByCode,
  searchCountriesHandler,
} from "../controllers/countryControllers";

const router: Router = express.Router();

router.get("/", getAllCountries);
router.get("/region/:region", getCountriesByRegion);
router.get("/search", searchCountriesHandler);
router.get("/:code", getCountryByCode);

export default router;

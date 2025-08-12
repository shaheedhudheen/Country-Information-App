import React, { useState, useEffect } from "react";
import CountryCard from "../components/CountryCard";
import { getAllCountries, searchCountries } from "../services/countryService";
import type { Country } from "../types/country";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CountryListPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");
  const navigate = useNavigate();

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const loadCountries = async () => {
    setLoading(true);
    setError(null);
    try {
      let data: Country[];
      if (searchTerm || regionFilter) {
        data = await searchCountries({
          name: searchTerm,
          region: regionFilter,
        });
      } else {
        data = await getAllCountries();
      }
      setCountries(data);
    } catch (err) {
      setError("Failed to load countries");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountries();
  }, [searchTerm, regionFilter]);

  const handleCountryClick = (code: string) => {
    navigate(`/country/${code}`);
  };

  return (
    <div className="pb-6">
      {/* Navbar */}
      <Navbar
        searchTerm={searchTerm}
        regionFilter={regionFilter}
        regions={regions}
        onSearchChange={setSearchTerm}
        onRegionChange={setRegionFilter}
      />

      {/* Country Cards */}
      <div className="container mx-auto px-4 pt-6">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map((country) => (
            <CountryCard
              key={country.cca2}
              country={country}
              onClick={() => handleCountryClick(country.cca2)}
            />
          ))}
        </div>

        {countries.length === 0 && !loading && (
          <div className="text-center text-gray-500 py-12">
            No countries found
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryListPage;

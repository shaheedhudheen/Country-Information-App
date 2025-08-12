import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCountryByCode } from "../services/countryService";
import type { Country } from "../types/country";

const CountryDetailPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await getCountryByCode(code || "");
        setCountry(data && Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError("Failed to load country details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto max-w-md mt-8">
        {error}
      </div>
    );

  if (!country)
    return (
      <div className="text-center text-gray-500 py-8">Country not found</div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-200"
      >
        ← Back to Countries
      </button>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-8">
         
          <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
            <img
              src={country.flags.png}
              alt={country.name.common}
              className="w-full max-w-xs h-auto object-contain aspect-[2/3] border border-gray-100"
            />
          </div>

       
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {country.name.official}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500">
                  Common Name
                </h2>
                <p className="text-lg">{country.name.common}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-500">Region</h2>
                <p className="text-lg">{country.region}</p>
              </div>

              {country.subregion && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500">
                    Subregion
                  </h2>
                  <p className="text-lg">{country.subregion}</p>
                </div>
              )}

              {country.capital && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500">Capital</h2>
                  <p className="text-lg">{country.capital.join(", ")}</p>
                </div>
              )}

              <div>
                <h2 className="text-sm font-medium text-gray-500">
                  Population
                </h2>
                <p className="text-lg">{country.population.toLocaleString()}</p>
              </div>
            </div>

            {country.timezones && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Timezones
                </h2>
                <div className="flex flex-wrap gap-2">
                  {country.timezones.map((tz) => (
                    <span
                      key={tz}
                      className="px-3 py-1 bg-gray-50 rounded text-sm"
                    >
                      {tz}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {country.currencies && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Currencies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {Object.values(country.currencies).map((currency) => (
                    <span
                      key={currency.name}
                      className="px-3 py-1 bg-gray-50 rounded text-sm"
                    >
                      {currency.name} ({currency.symbol || "—"})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {country.languages && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {Object.values(country.languages).map((language) => (
                    <span
                      key={language}
                      className="px-3 py-1 bg-gray-50 rounded text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailPage;

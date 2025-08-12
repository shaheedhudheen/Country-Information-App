import React from "react";
import type { Country } from "../types/country";
import moment from "moment-timezone";

interface CountryCardProps {
  country: Country;
  onClick: () => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onClick }) => {
  const getCurrentTime = () => {
    if (!country.timezones || country.timezones.length === 0) return "—";

    try {
      const tz = country.timezones[0];
      if (tz.includes("/")) return moment().tz(tz).format("h:mm A");
      if (tz.startsWith("UTC"))
        return moment().utcOffset(tz.replace("UTC", "")).format("h:mm A");
      return "—";
    } catch (error) {
      console.error("Error formatting time:", error);
      return "—";
    }
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      <div className="aspect-video flex items-center justify-center bg-gray-50 p-2">
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="h-full object-contain"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {country.name.common}
        </h3>

        <div className="flex justify-between text-sm">
          <div className="text-gray-600">
            <span className="font-medium">Population:</span>{" "}
            {country.population.toLocaleString()}
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Region:</span> {country.region}
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Time:</span> {getCurrentTime()}
        </div>
      </div>
    </div>
  );
};

export default CountryCard;

// import React from "react";

interface NavbarProps {
  searchTerm: string;
  regionFilter: string;
  regions: string[];
  onSearchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  regionFilter,
  regions,
  onSearchChange,
  onRegionChange,
}) => {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm py-4 px-4 ">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by country name"
            className="flex-grow p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />

          <select
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={regionFilter}
            onChange={(e) => onRegionChange(e.target.value)}
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { useState } from "react";
import propertiesData from "./data/properties.json";
import SearchForm from "./components/SearchForm";
import PropertyCard from "./components/PropertyCard";
import "./App.css";

function App() {
  const [filters, setFilters] = useState({
    type: "Any",
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    postcode: "Any",
    dateFrom: null,
    dateTo: null
  });

  const filteredProperties = propertiesData.properties.filter((property) => {
    const propertyDate = new Date(property.dateAdded);

    return (
      (filters.type === "Any" || property.type === filters.type) &&
      (!filters.minPrice || property.price >= filters.minPrice) &&
      (!filters.maxPrice || property.price <= filters.maxPrice) &&
      (!filters.minBedrooms || property.bedrooms >= filters.minBedrooms) &&
      (!filters.maxBedrooms || property.bedrooms <= filters.maxBedrooms) &&
      (filters.postcode === "Any" ||
        property.postcodeArea === filters.postcode) &&
      (!filters.dateFrom || propertyDate >= filters.dateFrom) &&
      (!filters.dateTo || propertyDate <= filters.dateTo)
    );
  });

  return (
    <div className="app">
      <h1>Estate Agent App</h1>

      <SearchForm filters={filters} setFilters={setFilters} />

      <h2>Search Results ({filteredProperties.length})</h2>

      <div className="property-list">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

export default App;

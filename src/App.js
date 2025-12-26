import { useState } from "react";
import propertiesData from "./data/properties.json";
import SearchForm from "./components/SearchForm.js";

function App() {

  const [filters, setFilters] = useState({
    type: "Any",
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    postcode: "Any",
    dateFrom: null
  });

  const filteredProperties = propertiesData.properties.filter((property) => {

    const propertyDate = new Date(property.dateAdded);

    return (
      (filters.type === "Any" || property.type === filters.type) &&
      (!filters.minPrice || property.price >= filters.minPrice) &&
      (!filters.maxPrice || property.price <= filters.maxPrice) &&
      (!filters.minBedrooms || property.bedrooms >= filters.minBedrooms) &&
      (!filters.maxBedrooms || property.bedrooms <= filters.maxBedrooms) &&
      (filters.postcode === "Any" || property.postcodeArea === filters.postcode) &&
      (!filters.dateFrom || propertyDate >= filters.dateFrom)
    );
  });

  return (
    <div className="app">
      <h1>Estate Agent App</h1>

      <SearchForm filters={filters} setFilters={setFilters} />

      <h2>Search Results ({filteredProperties.length})</h2>

      <div className="property-list">
        {filteredProperties.map((property) => (
          <div key={property.id} className="property-card">
            <img
              src={property.picture}
              alt={property.type}
              width="220"
            />
            <h3>{property.type}</h3>
            <p><strong>£{property.price.toLocaleString()}</strong></p>
            <p>{property.bedrooms} bedrooms</p>
            <p>{property.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

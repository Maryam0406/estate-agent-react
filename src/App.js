import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import propertiesData from "./data/properties.json";
import SearchForm from "./components/SearchForm";
import PropertyCard from "./components/PropertyCard";
import PropertyPage from "./pages/PropertyPage";
import FavouritesList from "./components/FavouritesList";
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

  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (property) => {
    if (!favourites.some((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter((p) => p.id !== id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  // ✅ FIXED FILTER LOGIC (handles 0 correctly)
  const filteredProperties = propertiesData.properties.filter((property) => {
    const propertyDate = new Date(property.dateAdded);

    return (
      (filters.type === "Any" || property.type === filters.type) &&

      (filters.minPrice !== null
        ? property.price >= filters.minPrice
        : true) &&

      (filters.maxPrice !== null
        ? property.price <= filters.maxPrice
        : true) &&

      (filters.minBedrooms !== null
        ? property.bedrooms >= filters.minBedrooms
        : true) &&

      (filters.maxBedrooms !== null
        ? property.bedrooms <= filters.maxBedrooms
        : true) &&

      (filters.postcode === "Any" ||
        property.postcodeArea === filters.postcode) &&

      (filters.dateFrom
        ? propertyDate >= filters.dateFrom
        : true) &&

      (filters.dateTo
        ? propertyDate <= filters.dateTo
        : true)
    );
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <h1>Estate Agent App</h1>

            <div className="layout">
              <div className="main-content">
                <SearchForm
                  filters={filters}
                  setFilters={setFilters}
                />

                <h2>
                  Search Results ({filteredProperties.length})
                </h2>

                <div className="property-list">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      addToFavourites={addToFavourites}
                    />
                  ))}
                </div>
              </div>

              <FavouritesList
                favourites={favourites}
                addToFavourites={addToFavourites}
                removeFromFavourites={removeFromFavourites}
                clearFavourites={clearFavourites}
              />
            </div>
          </div>
        }
      />

      <Route
        path="/property/:id"
        element={<PropertyPage />}
      />
    </Routes>
  );
}

export default App;

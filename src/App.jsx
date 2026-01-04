import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import propertiesData from "./data/properties.json";
import SearchForm from "./components/SearchForm";
import PropertyCard from "./components/PropertyCard";
import PropertyPage from "./pages/PropertyPage";
import FavouritesList from "./components/FavouritesList";
import "./App.css";

//Stores all active search and filter options
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

  //Stores list of favourite properties
  const [favourites, setFavourites] = useState([]);

  //Add property to favourites
  const addToFavourites = (property) => {
    if (!favourites.some((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  //Remove proeprty from favourites
  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter((p) => p.id !== id));
  };

  //Resets favourite list to empty
  const clearFavourites = () => {
    setFavourites([]);
  };

  
  
  const filteredProperties = propertiesData.properties.filter((property) => {
    const propertyDate = new Date(property.dateAdded);

    return (
      //filter for property type
      (filters.type === "Any" || property.type === filters.type) &&

      //filter for minimum price
      (filters.minPrice !== null
        ? property.price >= filters.minPrice
        : true) &&

      //filter for maximum price  
      (filters.maxPrice !== null
        ? property.price <= filters.maxPrice
        : true) &&

      //filter for minimum bedrooms  
      (filters.minBedrooms !== null
        ? property.bedrooms >= filters.minBedrooms
        : true) &&


      //filter for maximum bedrooms  
      (filters.maxBedrooms !== null
        ? property.bedrooms <= filters.maxBedrooms
        : true) &&

      //filter for postcode area
      (filters.postcode === "Any" ||
        property.postcodeArea === filters.postcode) &&

      //filter for date added range
      (filters.dateFrom
        ? propertyDate >= filters.dateFrom
        : true) &&
      //filter for date added range
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
                {/*Search and filter controls*/}
                <SearchForm
                  filters={filters}
                  setFilters={setFilters}
                />

                <h2>
                  Search Results ({filteredProperties.length})
                </h2>

                {/*Property Cards*/}
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

              {/* Favourites sidebar */}    
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

      {/*Displays a single property's details using its ID*/}
      <Route
        path="/property/:id"
        element={<PropertyPage />}
      />
    </Routes>
  );
}

export default App;

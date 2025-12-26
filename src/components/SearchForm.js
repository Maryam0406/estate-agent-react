import { useEffect } from "react";

function SearchForm({ filters, setFilters }) {

  // React lifecycle hook (runs whenever filters change)
  useEffect(() => {
    console.log("Search filters updated:", filters);
  }, [filters]);

  return (
    <div className="search-form">
      <h2>Search Properties</h2>

      {/* Property Type */}
      <label htmlFor="type">Property Type</label>
      <select
        id="type"
        value={filters.type}
        onChange={(e) =>
          setFilters({ ...filters, type: e.target.value })
        }
      >
        <option value="Any">Any</option>
        <option value="House">House</option>
        <option value="Flat">Flat</option>
      </select>

      {/* Min Price */}
      <label htmlFor="minPrice">Min Price (£)</label>
      <input
        id="minPrice"
        type="number"
        value={filters.minPrice || ""}
        onChange={(e) =>
          setFilters({ ...filters, minPrice: e.target.value })
        }
      />

      {/* Max Price */}
      <label htmlFor="maxPrice">Max Price (£)</label>
      <input
        id="maxPrice"
        type="number"
        value={filters.maxPrice || ""}
        onChange={(e) =>
          setFilters({ ...filters, maxPrice: e.target.value })
        }
      />

      {/* Min Bedrooms */}
      <label htmlFor="minBedrooms">Min Bedrooms</label>
      <input
        id="minBedrooms"
        type="number"
        value={filters.minBedrooms || ""}
        onChange={(e) =>
          setFilters({ ...filters, minBedrooms: e.target.value })
        }
      />

      {/* Max Bedrooms */}
      <label htmlFor="maxBedrooms">Max Bedrooms</label>
      <input
        id="maxBedrooms"
        type="number"
        value={filters.maxBedrooms || ""}
        onChange={(e) =>
          setFilters({ ...filters, maxBedrooms: e.target.value })
        }
      />

      {/* Date Added */}
      <label htmlFor="dateFrom">Date Added After</label>
      <input
        id="dateFrom"
        type="date"
        onChange={(e) =>
          setFilters({
            ...filters,
            dateFrom: new Date(e.target.value)
          })
        }
      />

      {/* Postcode Area */}
      <label htmlFor="postcode">Postcode Area</label>
      <select
        id="postcode"
        value={filters.postcode}
        onChange={(e) =>
          setFilters({ ...filters, postcode: e.target.value })
        }
      >
        <option value="Any">Any</option>
        <option value="BR1">BR1</option>
        <option value="BR5">BR5</option>
        <option value="BR6">BR6</option>
        <option value="BR7">BR7</option>
        <option value="NW1">NW1</option>
        <option value="SE1">SE1</option>
        <option value="DA15">DA15</option>
      </select>
    </div>
  );
}

export default SearchForm;

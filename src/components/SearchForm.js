function SearchForm({ filters, setFilters }) {
  return (
    <div className="search-form">
      <h2>Search Properties</h2>

      {/* Property Type */}
      <label>Property Type</label>
      <select
        value={filters.type}
        onChange={(e) =>
          setFilters({ ...filters, type: e.target.value })
        }
      >
        <option value="Any">Any</option>
        <option value="House">House</option>
        <option value="Flat">Flat</option>
      </select>

      {/* Price */}
      <label>Min Price (£)</label>
      <input
        type="number"
        value={filters.minPrice ?? ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            minPrice: e.target.value ? Number(e.target.value) : null
          })
        }
      />

      <label>Max Price (£)</label>
      <input
        type="number"
        value={filters.maxPrice ?? ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            maxPrice: e.target.value ? Number(e.target.value) : null
          })
        }
      />

      {/* Bedrooms */}
      <label>Min Bedrooms</label>
      <input
        type="number"
        value={filters.minBedrooms ?? ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            minBedrooms: e.target.value ? Number(e.target.value) : null
          })
        }
      />

      <label>Max Bedrooms</label>
      <input
        type="number"
        value={filters.maxBedrooms ?? ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            maxBedrooms: e.target.value ? Number(e.target.value) : null
          })
        }
      />

      {/* Date Added */}
      <label>Date Added From</label>
      <input
        type="date"
        onChange={(e) =>
          setFilters({
            ...filters,
            dateFrom: e.target.value ? new Date(e.target.value) : null
          })
        }
      />

      <label>Date Added To</label>
      <input
        type="date"
        onChange={(e) =>
          setFilters({
            ...filters,
            dateTo: e.target.value ? new Date(e.target.value) : null
          })
        }
      />

      {/* Postcode */}
      <label>Postcode Area</label>
      <select
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

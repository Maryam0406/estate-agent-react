import Select from "react-select";
import DatePicker from "react-datepicker";
import Slider from "rc-slider";
import "react-datepicker/dist/react-datepicker.css";
import "rc-slider/assets/index.css";

function SearchForm({ filters, setFilters }) {
  const typeOptions = [
    { value: "Any", label: "Any" },
    { value: "House", label: "House" },
    { value: "Flat", label: "Flat" }
  ];

  const postcodeOptions = [
    { value: "Any", label: "Any" },
    { value: "BR1", label: "BR1" },
    { value: "BR5", label: "BR5" },
    { value: "BR6", label: "BR6" },
    { value: "BR7", label: "BR7" },
    { value: "NW1", label: "NW1" },
    { value: "SE1", label: "SE1" },
    { value: "DA15", label: "DA15" }
  ];

  return (
    <div className="search-form">
      <h2>Search Properties</h2>

      {/* Property Type */}
      <div className="search-item">
        <label>Property Type</label>
        <Select
          options={typeOptions}
          value={typeOptions.find(o => o.value === filters.type)}
          onChange={(option) =>
            setFilters({ ...filters, type: option.value })
          }
        />
      </div>

      {/* Price Range */}
      <div className="search-item">
        <label>Price Range</label>
        <div className="slider-row">
          <span>
            £{filters.minPrice ?? 0} – £{filters.maxPrice ?? 1500000}
          </span>
          <Slider
            range
            min={0}
            max={1500000}
            step={25000}
            value={[
              filters.minPrice ?? 0,
              filters.maxPrice ?? 1500000
            ]}
            onChange={([min, max]) =>
              setFilters({
                ...filters,
                minPrice: min,
                maxPrice: max
              })
            }
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="search-item">
        <label>Bedrooms</label>
        <div className="slider-row">
          <span>
            {filters.minBedrooms ?? 0} – {filters.maxBedrooms ?? 6}
          </span>
          <Slider
            range
            min={0}
            max={6}
            value={[
              filters.minBedrooms ?? 0,
              filters.maxBedrooms ?? 6
            ]}
            onChange={([min, max]) =>
              setFilters({
                ...filters,
                minBedrooms: min,
                maxBedrooms: max
              })
            }
          />
        </div>
      </div>

      {/* Date Added From */}
      <div className="search-item">
        <label>Date Added From</label>
        <DatePicker
          selected={filters.dateFrom}
          onChange={(date) =>
            setFilters({ ...filters, dateFrom: date })
          }
          dateFormat="yyyy-MM-dd"
        />
      </div>

      {/* Date Added To */}
      <div className="search-item">
        <label>Date Added To</label>
        <DatePicker
          selected={filters.dateTo}
          onChange={(date) =>
            setFilters({ ...filters, dateTo: date })
          }
          dateFormat="yyyy-MM-dd"
        />
      </div>

      {/* Postcode */}
      <div className="search-item">
        <label>Postcode Area</label>
        <Select
          options={postcodeOptions}
          value={postcodeOptions.find(
            o => o.value === filters.postcode
          )}
          onChange={(option) =>
            setFilters({ ...filters, postcode: option.value })
          }
        />
      </div>
    </div>
  );
}

export default SearchForm;

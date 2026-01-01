import { Link } from "react-router-dom";

function PropertyCard({ property, addToFavourites }) {

  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "property",
      JSON.stringify(property)
    );
  };

  return (
    <div
      className="property-card"
      draggable
      onDragStart={handleDragStart}
    >
      <img
        src={`/${property.images[0]}`}
        alt={property.type}
      />

      <h3>{property.type}</h3>
      <p>{property.location}</p>
      <p>{property.bedrooms} bedrooms</p>
      <p className="price">
        £{property.price.toLocaleString()}
      </p>

      {/* Button-based add */}
      <button onClick={() => addToFavourites(property)}>
        ❤️ Add to Favourites
      </button>

      <Link to={`/property/${property.id}`}>
        View Property
      </Link>
    </div>
  );
}

export default PropertyCard;

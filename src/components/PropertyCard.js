import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  const previewImage =
    property.images && property.images.length > 0
      ? property.images[0]
      : "";

  return (
    <div className="property-card">
      {previewImage && (
        <img
          src={previewImage}
          alt={property.type}
          className="property-image"
        />
      )}

      <div className="property-info">
        <h3>{property.type}</h3>
        <p>{property.location}</p>

        <p className="property-price">
          £{property.price.toLocaleString()}
        </p>

        <p>{property.bedrooms} bedrooms</p>
        <p>{property.tenure}</p>

        <Link to={`/property/${property.id}`} className="view-link">
          View Property
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;

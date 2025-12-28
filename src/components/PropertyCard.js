function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <img
        src={property.picture}
        alt={property.type}
        className="property-image"
      />

      <div className="property-info">
        <h3>{property.type}</h3>
        <p>{property.location}</p>

        <p className="property-price">
          £{property.price.toLocaleString()}
        </p>

        <p>{property.bedrooms} bedrooms</p>
        <p>{property.tenure}</p>

        <a
          href={property.url}
          className="view-link"
          target="_blank"
          rel="noreferrer"
        >
          View Property
        </a>
      </div>
    </div>
  );
}

export default PropertyCard;

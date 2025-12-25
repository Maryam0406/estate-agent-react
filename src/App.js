import propertiesData from "./data/properties.json";

function App() {
  return (
    <div>
      <h1>Estate Agent App</h1>

      <p>Total properties: {propertiesData.properties.length}</p>

      <hr />

      <div className="property-list">
        {propertiesData.properties.map((property) => (
          <div key={property.id} className="property-card">
            <img
              src={property.picture}
              alt={property.type}
              width="200"
            />

            <h3>{property.type}</h3>
            <p><strong>Price:</strong> £{property.price}</p>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><strong>Location:</strong> {property.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

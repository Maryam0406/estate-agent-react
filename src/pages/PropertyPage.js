import { useParams, Link } from "react-router-dom";
import propertiesData from "../data/properties.json";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PropertyPage() {
  const { id } = useParams();

  const property = propertiesData.properties.find(
    (p) => p.id === id
  );

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <div className="property-page">
      <Link to="/" className="back-link">
        ← Back to Search
      </Link>

      <h1>{property.type}</h1>
      <p>{property.location}</p>

      <p className="property-price">
        £{property.price.toLocaleString()}
      </p>

      <img
        src={property.picture}
        alt={property.type}
        className="property-image-large"
      />

      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <p>{property.description}</p>
        </TabPanel>

        <TabPanel>
          <img
            src="images/floorplan.jpg"
            alt="Floor plan"
            style={{ width: "100%" }}
          />
        </TabPanel>

        <TabPanel>
          <iframe
            title="map"
            width="100%"
            height="300"
            src={`https://maps.google.com/maps?q=${property.location}&output=embed`}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyPage;

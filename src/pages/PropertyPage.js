import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import propertiesData from "../data/properties.json";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PropertyPage() {
  const { id } = useParams();

  const property = propertiesData.properties.find(
    (p) => p.id === id
  );

  const [mainImage, setMainImage] = useState(
    property?.images[0]
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

      {/* MAIN IMAGE */}
      <img
        src={mainImage}
        alt="Main property view"
        className="property-image-large"
      />

      {/* THUMBNAILS */}
      <div className="thumbnail-row">
        {property.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={
              img === mainImage
                ? "thumbnail active"
                : "thumbnail"
            }
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>

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
            alt="Floor Plan"
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

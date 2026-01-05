import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import propertiesData from "../data/properties.json";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PropertyPage() {
  //Retrives property ID from URL
  const { id } = useParams();

  //Finds the matching property from JSON data
  const property = propertiesData.properties.find(
    (p) => p.id === id
  );

  const [mainImage, setMainImage] = useState(null);

  //Sets the first image as the main image when loaded
  useEffect(() => {
    if (property && property.images && property.images.length > 0) {
      setMainImage(property.images[0]);
    }
  }, [property]);
  //React automatically escapes JSX output which helps prevent XSS attacks by treating injected HTML as plain text
  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <div className="property-page">
      <div className="property-page-frame">

        {/* Back link to search page */}
        <Link to="/" className="back-link">
          ← Back to Search
        </Link>

        {/* Property Details */}
        <h1>{property.type}</h1>
        <p>{property.location}</p>
        <p className="property-price">
          £{property.price.toLocaleString()}
        </p>
        {/* Main property image is displayed */}
        {mainImage && (
          <img
            src={`/${mainImage}`}
            alt="Main property view"
            className="property-image-large"
          />
        )}
        {/* Thumbnail images */}
        <div className="thumbnail-row">
          {property.images.map((img, index) => (
            <img
              key={index}
              src={`/${img}`}
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

        {/* Tabs for Description, Floor Plan, and Map */}
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
              src="/images/floorplan.jpg"
              alt="Floor Plan"
              style={{ width: "100%" }}
            />
          </TabPanel>

          <TabPanel>
            <iframe
              title="Property Location"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                property.location
              )}&output=embed`}
              allowFullScreen
            />
          </TabPanel>


        </Tabs>

      </div>
    </div>
  );
}

export default PropertyPage;

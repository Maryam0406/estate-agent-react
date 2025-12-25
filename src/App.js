import propertiesData from "./data/properties.json";

function App() {
  return(
    <div>
      <h1>Estate Agent App</h1>

      <p>Total properties: {propertiesData.properties.length}</p>
    </div>
  );
}

export default App
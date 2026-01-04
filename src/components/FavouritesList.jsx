function FavouritesList({
  favourites,
  addToFavourites,
  removeFromFavourites,
  clearFavourites
}) {
  // Add to favourites (drag & drop from property card)
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("property");
    if (!data) return;

    const property = JSON.parse(data);
    addToFavourites(property);
  };

  // Favourite panel accespts dragged items
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Remove a property from favourites when dragged out
  const handleDragEnd = (e, id) => {
    const favouritesBox = e.currentTarget.parentElement;

    const rect = favouritesBox.getBoundingClientRect();
    const { clientX, clientY } = e;

    const isOutside =
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom;

    if (isOutside) {
      removeFromFavourites(id);
    }
  };

  return (
    // Favourites container
    <div
      className="favourites"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2> Favourites</h2>

      {/* Message shown when no favourite properties */ }
      {favourites.length === 0 && (
        <p>Drag properties here</p>
      )}

      {/* List of favourite properties */}
      {favourites.map((property) => (
        <div
          key={property.id}
          className="fav-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData(
              "property",
              JSON.stringify(property)
            )
          }
          onDragEnd={(e) =>
            handleDragEnd(e, property.id)
          }
        >
          <p>
            {/* Property type and price is displayed */}
            {property.type} – £
            {property.price.toLocaleString()}
          </p>

          {/*Button to remove from favourites*/}
          <button
            onClick={() =>
              removeFromFavourites(property.id)
            }
          >
            Remove
          </button>
        </div>
      ))}

      {/*Clear all favourites button*/}
      {favourites.length > 0 && (
        <button onClick={clearFavourites}>
          Clear All
        </button>
      )}
    </div>
  );
}

export default FavouritesList;

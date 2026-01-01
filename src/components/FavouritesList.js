function FavouritesList({
  favourites,
  addToFavourites,
  removeFromFavourites,
  clearFavourites
}) {
  // ADD to favourites (drop from property card)
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("property");
    if (!data) return;

    const property = JSON.parse(data);
    addToFavourites(property);
  };

  // ALLOW drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // REMOVE when dragged OUT
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
    <div
      className="favourites"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2>❤️ Favourites</h2>

      {favourites.length === 0 && (
        <p>Drag properties here</p>
      )}

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
            {property.type} – £
            {property.price.toLocaleString()}
          </p>

          <button
            onClick={() =>
              removeFromFavourites(property.id)
            }
          >
            ❌ Remove
          </button>
        </div>
      ))}

      {favourites.length > 0 && (
        <button onClick={clearFavourites}>
          Clear All
        </button>
      )}
    </div>
  );
}

export default FavouritesList;

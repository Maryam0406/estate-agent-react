function FavouritesList({
  favourites,
  removeFromFavourites,
  clearFavourites
}) {
  const handleDrop = (e) => {
    e.preventDefault();
    const property = JSON.parse(
      e.dataTransfer.getData("property")
    );
    if (property) {
      removeFromFavourites(property.id);
    }
  };

  return (
    <div
      className="favourites"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2>❤️ Favourites</h2>

      {favourites.length === 0 && <p>No favourites yet</p>}

      {favourites.map((property) => (
        <div key={property.id} className="fav-item">
          <p>{property.type} – £{property.price.toLocaleString()}</p>
          <button onClick={() => removeFromFavourites(property.id)}>
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

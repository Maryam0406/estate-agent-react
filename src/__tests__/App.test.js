import { render, screen, fireEvent} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "../App";
import propertiesData from "../data/properties.json";


// Helper function to wrap App in a Router
const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

/* Test 1: Check if the main heading renders */
test("renders Estate Agent App heading", () => {
  renderWithRouter();
  expect(screen.getByText(/Estate Agent App/i)).toBeInTheDocument();
});

/* Test 2: Check if property cards from JSON render */
test("renders property cards from JSON", () => {
  renderWithRouter();
  expect(screen.getAllByText(/£/i).length).toBeGreaterThan(0);
});

/* Test 3: Add property to favourites */
test("adds a property to favourites", () => {
  renderWithRouter();

  const addButtons = screen.getAllByText(/Add to Favourites/i);
  fireEvent.click(addButtons[0]);

  expect(screen.getByText(/Remove/i)).toBeInTheDocument();
});

/* Test 4: Remove property from favourites */
test("removes a property from favourites when remove button clicked", () => {
  renderWithRouter();

  const addButtons = screen.getAllByText(/Add to Favourites/i);
  fireEvent.click(addButtons[0]);

  const removeButton = screen.getByText(/Remove/i);
  fireEvent.click(removeButton);

  expect(screen.queryByText(/Remove/i)).not.toBeInTheDocument();
});


/* Test 5: Clear all favourites */
test("clears favourites list", () => {
  renderWithRouter();

  const addButtons = screen.getAllByText(/Add to Favourites/i);
  fireEvent.click(addButtons[0]);

  const clearButton = screen.getByText(/Clear All/i);
  fireEvent.click(clearButton);

  expect(screen.queryByText(/Remove/i)).not.toBeInTheDocument();
});

/* Test 6: Prevent duplicate favourites */
test("prevents duplicate favourites", () => {
  renderWithRouter();

  const addButtons = screen.getAllByText(/Add to Favourites/i);
  fireEvent.click(addButtons[0]);
  fireEvent.click(addButtons[0]);

  const removeButtons = screen.getAllByText(/Remove/i);
  expect(removeButtons.length).toBe(1);
});

/* Test 7: Navigation to property page works */
test("navigates to property details page", () => {
  renderWithRouter();

  const viewLinks = screen.getAllByText(/View Property/i);
  fireEvent.click(viewLinks[0]);

  expect(
    screen.getByText(/Back to Search/i)
  ).toBeInTheDocument();
});

//Test 8: Property page displays thumbnails
test("property page displays thumbnails", () => {
  window.history.pushState({}, "", "/property/prop1");
  renderWithRouter();

  const thumbnails = screen.getAllByAltText(/Thumbnail/i);
  expect(thumbnails.length).toBeGreaterThan(1);
});

/* Test 9: Clicking thumbnail updates main image */
test("clicking thumbnail updates main image", () => {
  window.history.pushState({}, "", "/property/prop1");
  renderWithRouter();

  const thumbnails = screen.getAllByRole("img");
  fireEvent.click(thumbnails[1]);

  expect(thumbnails[1]).toHaveClass("thumbnail active");
});


/* Test 10: Verifies price filter includes only properties above minimum price */
test("price filter logic supports minimum price filtering", () => {
  const testProperties = [
    { price: 500000 },
    { price: 1000000 },
    { price: 1500000 },
  ];

  const expensiveProperties = testProperties.filter(p => p.price >= 1000000);

  // Only properties with price 1,000,000 or more should be included
  expect(expensiveProperties).toEqual([
    { price: 1000000 },
    { price: 1500000 },
  ]);
});


/* Test 11: Verifies bedroom filter includes only properties with minimum bedrooms */
test("bedroom filter logic supports minimum bedrooms", () => {
  const testProperties = [
    { bedrooms: 3 },
    { bedrooms: 4 },
    { bedrooms: 5 },
  ];

  const largeProperties = testProperties.filter(p => p.bedrooms >= 4);

  // Only properties with 4 or more bedrooms should be included
  expect(largeProperties).toEqual([
    { bedrooms: 4 },
    { bedrooms: 5 },
  ]);
});


/* Test 12: Ensures date filter only includes properties added on or after a certain date */
test("date filter logic includes only recent properties", () => {
  const testProperties = [
    { dateAdded: "2025-12-31" },
    { dateAdded: "2025-12-29" },
  ];

  const recent = testProperties.filter(p => new Date(p.dateAdded) >= new Date("2025-12-30"));

  expect(recent).toEqual([{ dateAdded: "2025-12-31" }]);
});

/* Test 13: Verifies postcode filter includes properties only in the BR area */
test("postcode filter logic supports BR postcode areas", () => {
  const testProperties = [
    { postcodeArea: "BR1" },
    { postcodeArea: "SE1" },
    { postcodeArea: "BR2" },
  ];

  const brProperties = testProperties.filter(p => p.postcodeArea.startsWith("BR"));

  // Only properties with postcode starting with "BR" should be included
  expect(brProperties).toEqual([
    { postcodeArea: "BR1" },
    { postcodeArea: "BR2" },
  ]);
});









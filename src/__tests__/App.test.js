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

/* Test 4: Clear all favourites */
test("clears favourites list", () => {
  renderWithRouter();

  const addButtons = screen.getAllByText(/Add to Favourites/i);
  fireEvent.click(addButtons[0]);

  const clearButton = screen.getByText(/Clear All/i);
  fireEvent.click(clearButton);

  expect(screen.queryByText(/Remove/i)).not.toBeInTheDocument();
});

/* Test 5: Prevent duplicate favourites */
test("prevents duplicate favourites", () => {
  renderWithRouter();

  const addButtons = screen.getAllByText(/Add to Favourites/i);
  fireEvent.click(addButtons[0]);
  fireEvent.click(addButtons[0]);

  const removeButtons = screen.getAllByText(/Remove/i);
  expect(removeButtons.length).toBe(1);
});


/* Test 6: Navigation to property page works */
test("navigates to property details page", () => {
  renderWithRouter();

  const viewLinks = screen.getAllByText(/View Property/i);
  fireEvent.click(viewLinks[0]);

  expect(
    screen.getByText(/Back to Search/i)
  ).toBeInTheDocument();
});









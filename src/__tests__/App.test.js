import { render, screen} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "../App";

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




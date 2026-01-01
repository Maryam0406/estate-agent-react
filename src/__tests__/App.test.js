import { render, screen, fireEvent } from "@testing-library/react";
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


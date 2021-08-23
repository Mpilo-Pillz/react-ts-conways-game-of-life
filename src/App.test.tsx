import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Game of Life heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Conways Game of Life/i);
  expect(headingElement).toBeInTheDocument();
});

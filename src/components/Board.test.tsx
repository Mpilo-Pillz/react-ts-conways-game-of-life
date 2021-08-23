import { render, screen } from "@testing-library/react";
import Board from "./Board";
import userEvent from "@testing-library/user-event";

describe("Board components", () => {
  beforeEach(() => {
    render(<Board />);
  });
  test("Renders the board elements", () => {
    const board = screen.getByTestId("board");
    const actionButton = screen.getByTestId("action");
    const randomiseButton = screen.getByTestId("randomize");
    const clearButton = screen.getByTestId("clear");

    expect(board).toBeInTheDocument();
    expect(actionButton).toBeInTheDocument();
    expect(randomiseButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  test("renders 'stop button' on when start button is clicked", () => {
    const actionButton = screen.getByTestId("action");
    expect(actionButton).toHaveTextContent("Start");
    userEvent.click(actionButton);
    expect(actionButton).toHaveTextContent("Stop");
  });
});

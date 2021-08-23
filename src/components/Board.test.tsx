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

  test("randomizes the placement of living cells after 'randomize button' has been clicked", () => {
    const board = document.querySelectorAll(".board__cell");
    const isRandom = Array.from(board).filter(
      (element: any) => element.style.backgroundColor === "teal"
    );
    const randomButton = screen.getByTestId("randomize");
    userEvent.click(randomButton);
    expect(isRandom.length).toBeGreaterThan(0);
  });

  test("clears all living cells when clear button is clicked", () => {
    const clearButton = screen.getByTestId("clear");
    userEvent.click(clearButton);
    const board = document.querySelectorAll(".board__cell");
    const isRandom = Array.from(board).filter(
      (element: any) => element.style.backgroundColor === "teal"
    );
    expect(isRandom.length).toEqual(0);
  });
});

import { CellBinary } from "../customTypes/game.types";

export const plotTilesRandomly = (
  numberOfRows: number,
  numberOfColumns: number
): number[][] => {
  const rows: CellBinary[][] = [];
  for (let i = 0; i < numberOfRows; i++) {
    rows.push(
      Array.from(Array(numberOfColumns), () => (Math.random() > 0.7 ? 1 : 0))
    );
  }

  return rows;
};

export const resetGrid = (
  numberOfRows: number,
  numberColumns: number
): number[][] => {
  const rows = [];
  for (let i = 0; i < numberOfRows; i++) {
    rows.push(Array.from(Array(numberColumns), () => 0));
  }

  return rows;
};

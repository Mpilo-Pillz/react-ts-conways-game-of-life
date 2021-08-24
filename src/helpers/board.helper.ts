import { CellBinary } from "../customTypes/game.types";

const cellSurroundingNeighbors = [
  [0, 1], // Neighbor on the right
  [0, -1], // Neighbor on the left
  [1, -1], // Neighbor on the top left
  [-1, 1], // Neighbor on the top right
  [1, 1], // Neighbor on the top
  [-1, -1], // Neighbor on the bottom
  [1, 0], // Neighbor on the bottom right
  [-1, 0], // Neighbor on the bottom left
];

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
  numberOfColumns: number
): number[][] => {
  const rows = [];
  for (let i = 0; i < numberOfRows; i++) {
    rows.push(Array.from(Array(numberOfColumns), () => 0));
  }

  return rows;
};

export function gameLogic(
  grid: number[][],
  numberOfColumns: number,
  numberOfRows: number
): number[][] {
  let gridCopy = JSON.parse(JSON.stringify(grid));
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfColumns; j++) {
      let neighbouringCells = 0;

      cellSurroundingNeighbors.forEach(([x, y]) => {
        const newI = i + x;
        const newJ = j + y;

        if (
          newI >= 0 &&
          newI < numberOfRows &&
          newJ >= 0 &&
          newJ < numberOfColumns
        ) {
          neighbouringCells += grid[newI][newJ];
        }
      });

      if (neighbouringCells < 2 || neighbouringCells > 3) {
        gridCopy[i][j] = 0;
      } else if (grid[i][j] === 0 && neighbouringCells === 3) {
        gridCopy[i][j] = 1;
      }
    }
  }

  return gridCopy;
}

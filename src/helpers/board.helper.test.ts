import {
  gameLogic,
  plotTilesRandomly,
  resetGrid,
} from "../helpers/board.helper";

test("It should return an array 25 elements", () => {
  expect(resetGrid(25, 35)).toHaveLength(25);
});

test("It should return an array with all elements equal 0 representing all dead cells", () => {
  const hasNoLivingCells = resetGrid(25, 35).every((row) =>
    row.every((dead) => dead === 0)
  );

  expect(hasNoLivingCells).toBe(true);
});

test("It should return an array with the element 1 representing the presence of at least 1 living cell", () => {
  const hasLivingCell = plotTilesRandomly(25, 35).some((row) =>
    row.some((alive) => alive === 1)
  );

  expect(hasLivingCell).toBe(true);
});

test("Cells should die of under population if they have fewer than 2 neighbors,", () => {
  const fewerThanTwoNeighbors = jest.fn().mockImplementation(() => [
    [0, 0, 1],
    [0, 0, 0],
    [1, 0, 0],
  ]);

  expect(gameLogic(fewerThanTwoNeighbors(), 3, 3)).toEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});

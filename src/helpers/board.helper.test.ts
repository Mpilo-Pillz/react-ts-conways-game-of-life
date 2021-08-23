import { plotTilesRandomly, resetGrid } from "../helpers/board.helper";

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
    row.some((one) => one === 1)
  );

  expect(hasLivingCell).toBe(true);
});

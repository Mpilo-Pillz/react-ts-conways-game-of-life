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

describe("Cell mortality based on neighbors", () => {
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

  test("Reproduction occurs and a dead cell becomes alive if it has three live neighbors.", () => {
    const reproduction = jest.fn().mockImplementation(() => [
      [0, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ]);

    expect(gameLogic(reproduction(), 3, 3)).toEqual([
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ]);
  });

  test("Cell lives on to the next generation if it has two neighbors", () => {
    const survival = jest.fn().mockImplementation(() => [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ]);

    expect(gameLogic(survival(), 3, 3)).toEqual([
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]);
  });

  test("Cell dies by overpopulation if it has three live neighbors.", () => {
    const overpopulation = jest.fn().mockImplementation(() => [
      [0, 1, 1, 0],
      [0, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    expect(gameLogic(overpopulation(), 4, 4)).toEqual([
      [0, 1, 0, 1],
      [0, 1, 0, 1],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ]);
  });

  test("Cells live when there is balance", () => {
    const sufficientNeighbors = jest.fn().mockImplementation(() => [
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ]);

    expect(gameLogic(sufficientNeighbors(), 3, 3)).toEqual([
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ]);
  });
});

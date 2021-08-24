import { FC, useState, useRef, useCallback } from "react";
import {
  gameLogic,
  plotTilesRandomly,
  resetGrid,
} from "../helpers/board.helper";
import { BoardProps, DeadOrAlive } from "../customTypes/game.types";
import useInterval from "./UseInterval";

const Board: FC<BoardProps> = ({ numberOfColumns, numberOfRows, interval }) => {
  const [grid, setGrid] = useState(() => {
    return plotTilesRandomly(numberOfRows, numberOfColumns);
  });

  const [isRunning, setIsRunning] = useState(false);
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const startGame = useCallback(
    (grid: number[][]) => {
      if (!runningRef.current) return;

      setGrid(gameLogic(grid, numberOfColumns, numberOfRows));
    },
    [numberOfColumns, numberOfRows]
  );

  useInterval(() => {
    startGame(grid);
  }, interval);

  return (
    <>
      <section
        data-testid="board"
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numberOfColumns}, 20px)`,
        }}
      >
        {grid.map((rows, outerIndex) =>
          rows.map((_, innerIndex) => (
            <div
              key={`${outerIndex}-${innerIndex}`}
              onClick={() => {
                let newGrid = JSON.parse(JSON.stringify(grid));
                newGrid[outerIndex][innerIndex] = grid[outerIndex][innerIndex]
                  ? DeadOrAlive.DEAD
                  : DeadOrAlive.ALIVE;
                setGrid(newGrid);
              }}
              className="board__cell"
              style={{
                backgroundColor: grid[outerIndex][innerIndex]
                  ? "teal"
                  : undefined,
              }}
            ></div>
          ))
        )}
      </section>

      <div>
        <button
          data-testid="action"
          className="board__button"
          onClick={() => {
            setIsRunning(!isRunning);
            if (!isRunning) {
              runningRef.current = true;
            }
          }}
        >
          {isRunning ? "Stop" : "Start"}
        </button>

        <button
          data-testid="randomize"
          className="board__button"
          onClick={() => {
            setGrid(plotTilesRandomly(numberOfRows, numberOfColumns));
          }}
        >
          Randomize
        </button>

        <button
          data-testid="clear"
          className="board__button"
          onClick={() => {
            setGrid(resetGrid(numberOfRows, numberOfColumns));
          }}
        >
          Clear
        </button>
      </div>
    </>
  );
};

export default Board;

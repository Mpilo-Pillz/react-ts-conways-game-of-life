import { FC, useState, useRef, useCallback } from "react";
import {
  gameLogic,
  plotTilesRandomly,
  resetGrid,
} from "../helpers/board.helper";
import { DeadOrAlive } from "../customTypes/game.types";
import useInterval from "./UseInterval";

const numberColumns = 35;
const numberOfRows = 25;

const Board: FC = () => {
  const [grid, setGrid] = useState(() => {
    return plotTilesRandomly(numberOfRows, numberColumns);
  });

  const [isRunning, setIsRunning] = useState(false);
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const startGame = useCallback((grid: number[][]) => {
    if (!runningRef.current) return;

    setGrid(gameLogic(grid, numberColumns, numberOfRows));
  }, []);

  useInterval(() => {
    startGame(grid);
  }, 150);

  return (
    <>
      <section
        data-testid="board"
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numberColumns}, 20px)`,
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
            setGrid(plotTilesRandomly(numberOfRows, numberColumns));
          }}
        >
          Randomize
        </button>

        <button
          data-testid="clear"
          className="board__button"
          onClick={() => {
            setGrid(resetGrid(numberOfRows, numberColumns));
          }}
        >
          Clear
        </button>
      </div>
    </>
  );
};

export default Board;

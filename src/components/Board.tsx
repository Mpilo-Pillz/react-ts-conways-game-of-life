import { FC, useState, useRef, useCallback } from "react";
import { plotTilesRandomly, resetGrid } from "../helpers/board.helper";
import { DeadOrAlive } from "../customTypes/game.types";
import useInterval from "./UseInterval";

const numberColumns = 35;
const numberOfRows = 25;

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

const App: FC = () => {
  const [grid, setGrid] = useState(() => {
    return plotTilesRandomly(numberOfRows, numberColumns);
  });

  const [isRunning, setIsRunning] = useState(false);
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const startGame = useCallback((grid) => {
    if (!runningRef.current) return;

    let gridCopy = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < numberOfRows; i++) {
      for (let j = 0; j < numberColumns; j++) {
        let neighbouringCells = 0;

        cellSurroundingNeighbors.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;

          if (
            newI >= 0 &&
            newI < numberOfRows &&
            newJ >= 0 &&
            newJ < numberColumns
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

    setGrid(gridCopy);
  }, []);

  useInterval(() => {
    startGame(grid);
  }, 1500);

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

export default App;

import { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [numberOfColumns] = useState(35);
  const [numberOfRows] = useState(25);
  const [interval] = useState(150);

  return (
    <Board
      numberOfColumns={numberOfColumns}
      numberOfRows={numberOfRows}
      interval={interval}
    />
  );
};

export default Game;

export interface BoardProps {
  numberOfRows: number;
  numberOfColumns: number;
  interval: number;
}

export enum DeadOrAlive {
  DEAD = 0,
  ALIVE = 1,
}

export type CellBinary = 0 | 1;

import "./BoardView.scss";
import useWindowSize from "../useWindowSize";
import { Board } from "./Board";
import { BoardSupport } from "./BoardSupport";

type Props = {
  board: Board;
  show: (boardSized: BoardSized) => JSX.Element;
};

export type BoardSized = {
  board: Board;
  size: BoardSize;
};

export type BoardSize = {
  cellSize: number;
  fontSize: number;
  borderWidth: number;
  gridWidth: number;
  gridHeight: number;
  cluesHSize: number;
  cluesVSize: number;
};

export const BoardSizing = ({ board, show }: Props) => {
  const gridWidth = BoardSupport.width(board);
  const gridHeight = BoardSupport.height(board);
  const cluesHSize = BoardSupport.cluesHSize(board);
  const cluesVSize = BoardSupport.cluesVSize(board);
  const { windowWidth, windowHeight } = useWindowSize();
  const windowMin = Math.min(windowWidth * 0.95, windowHeight * 0.95);

  const cellSize = Math.min(
    32,
    windowMin / Math.max(gridWidth + cluesHSize, gridHeight + cluesVSize + 2)
  );
  const borderWidth = 1;
  const fontSize = Math.round(100 * cellSize * 0.75) / 100;

  const size = {
    cellSize,
    fontSize,
    borderWidth,
    gridWidth,
    gridHeight,
    cluesHSize,
    cluesVSize,
  };
  return show({
    board,
    size,
  });
};

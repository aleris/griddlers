import "./HomeBoardGridView.scss";
import { Board } from "../board/Board";
import { BoardSupport } from "../board/BoardSupport";

type Props = {
  board: Board;
};

export const HomeBoardGridView = ({ board }: Props) => {
  const width = BoardSupport.width(board);
  // 4 -> 0.25
  const viewWidth = 4; // rem
  const cellSize = Math.round((100 * viewWidth) / width) / 100;
  return (
    <div className="HomeBoardGrid" style={{ width: `${width * cellSize}rem` }}>
      {BoardSupport.mapEachCell(board, (cell, coordinateKey) => (
        <div
          key={coordinateKey}
          className="HomeBoardGrid--Cell"
          style={{
            backgroundColor: cell.fill ?? "none",
            width: `${cellSize}rem`,
            height: `${cellSize}rem`,
          }}
        />
      ))}
    </div>
  );
};

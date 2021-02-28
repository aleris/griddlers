import "./HomeBoardGridView.scss";
import { Board } from "../board/Board";
import { BoardSupport } from "../board/BoardSupport";
import {FillSupport} from '../board/FillSupport'

type Props = {
  board: Board;
  hideFills: boolean
  size: "Default" | "Large"
};

export const HomeBoardGridView = ({ board, hideFills, size }: Props) => {
  const width = BoardSupport.width(board);
  // 4 -> 0.25
  const viewWidth = size === "Default" ? 4 : 8; // rem
  const cellSize = Math.round((100 * viewWidth) / width) / 100;
  return (
    <div className="HomeBoardGrid" style={{ width: `${width * cellSize}rem` }}>
      {BoardSupport.mapEachCell(board, (cell, coordinateKey) => (
        <div
          key={coordinateKey}
          className="HomeBoardGrid--Cell"
          style={{
            backgroundColor: hideFills ? '#fff' : FillSupport.toColor(cell.fill),
            width: `${cellSize}rem`,
            height: `${cellSize}rem`,
          }}
        />
      ))}
    </div>
  );
};

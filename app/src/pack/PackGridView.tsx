import "./PackGridView.scss";
import {Board} from "../board/Board";
import {BoardSupport} from "../board/BoardSupport";
import {FillSupport} from "../board/FillSupport";

type Props = {
  board: Board;
  hideFills: boolean;
};

export const PackGridView = ({board, hideFills}: Props) => {
  const width = BoardSupport.width(board);
  const height = BoardSupport.height(board)
  const viewWidth = width === 2 ? 6 : width === 3 ? 8 : 10; // vmin
  const cellSize = Math.round((100 * viewWidth) / width) / 100;
  return (
    <div className="PackGrid"
         style={{
           gridTemplateColumns: `repeat(${width}, ${cellSize}vmin)`,
           gridTemplateRows: `repeat(${height}, ${cellSize}vmin)`,
         }}>
      {BoardSupport.mapEachCell(board, (cell, coordinateKey) => (
        <div
          key={coordinateKey}
          className="PackGrid--Cell"
          style={{
            backgroundColor: FillSupport.toColor(cell.fill, hideFills)
          }}
        />
      ))}
    </div>
  );
};

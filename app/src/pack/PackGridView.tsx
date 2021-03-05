import "./PackGridView.scss";
import { Board, FillColors } from "../board/Board";
import { BoardSupport } from "../board/BoardSupport";
import { FillSupport } from "../board/FillSupport";
import classNames from "../classNames";

type Props = {
  board: Board;
  hideFills: boolean;
  showGrid?: boolean;
};

export const PackGridView = ({ board, hideFills, showGrid = false }: Props) => {
  const width = BoardSupport.width(board);
  const height = BoardSupport.height(board);
  let cellSize: number;
  if (height < width) {
    const viewWidth = width === 2 ? 6 : width === 3 ? 8 : 10;
    cellSize = Math.round((100 * viewWidth) / width) / 100;
  } else {
    const viewHeight = height === 2 ? 6 : height === 3 ? 8 : 10;
    cellSize = Math.round((100 * viewHeight) / height) / 100;
  }
  return (
    <div
      className={classNames("PackGrid", { ShowGrid: showGrid })}
      style={{
        gridTemplateColumns: `repeat(${width}, ${cellSize}vmin)`,
        gridTemplateRows: `repeat(${height}, ${cellSize}vmin)`,
      }}
    >
      {BoardSupport.mapEachCell(board, (cell, coordinateKey) => (
        <div
          key={coordinateKey}
          className="PackGrid--Cell"
          style={{
            backgroundColor: FillSupport.toColor(
              cell.fill,
              hideFills,
              showGrid ? FillColors.White : "transparent"
            ),
          }}
        />
      ))}
    </div>
  );
};

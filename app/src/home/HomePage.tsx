import "./HomePage.scss";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { loadPacksAction } from "../actions/LoadPacksAction";
import { selectPackAction } from "../actions/SelectPackAction";
import { GameContext } from "../GameContext";
import { PackGridView } from "../pack/PackGridView";
import { AnimatedTitle } from "./AnimatedTitle";
import { PackProgressView } from "./PackProgressView";
import { PackWithProgress } from "./PackWithProgress";

export const HomePage = () => {
  const { state, dispatch } = useContext(GameContext);
  const history = useHistory();

  const packs = state.packs;

  const handlePackOnClick = async (pack: PackWithProgress) => {
    await dispatch(selectPackAction(pack.packId));
    history.push("/pack");
  };

  useEffect(() => {
    console.log("HomePage useEffect");
    dispatch(loadPacksAction());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Home">
      <div className="Home--SupraTitle">Color</div>
      <div className="Home--Title">
        <AnimatedTitle text="GRIDDLERS" />
      </div>
      <div className="Home--Packs">
        {packs.map((pack, index) => (
          <div
            key={pack.packId}
            className="Home--Pack"
            style={{ animationDelay: `${100 * (packs.length - index - 1)}ms` }}
          >
            <button onClick={() => handlePackOnClick(pack)}>
              <div className="Home--Pack--Content">
                <div className="Home--Pack--Grid">
                  <PackGridView board={pack.coverBoard} hideFills={false} />
                </div>
                <div className="Home--Pack--Progress">
                  <PackProgressView pack={pack} />
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

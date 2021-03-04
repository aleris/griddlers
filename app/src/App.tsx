import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BoardPage } from "./board/BoardPage";
import { GameProvider } from "./GameContext";
import {HomePage} from './home/HomePage'
import { PackPage } from "./pack/PackPage";

function App() {
  return (
    <div className="App">
      <GameProvider>
        <Router>
          <Switch>
            <Route path="/board/">
              <BoardPage />
            </Route>
            <Route path="/pack">
              <PackPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </GameProvider>
    </div>
  );
}

export default App;

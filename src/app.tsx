import React, { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./pages";
import Play from "./pages/play";

import "./styles/global.scss";

import "bootstrap/dist/js/bootstrap.bundle";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/play">
          <Play />
        </Route>
        <Route path="/">
          <Index />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

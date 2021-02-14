import React, { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Play from "./pages/play";

import "./styles/global.scss";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Play />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

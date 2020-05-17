import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";

import theme from "./theme.js";
import store from "./redux/store.js";
import Home from "./pages/Home/Home.js";
import Administrador from "./pages/Administrador/Administrador.js";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/administrador" component={Administrador} />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

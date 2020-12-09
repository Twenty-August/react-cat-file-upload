import React from "react";
import { Router, Route, Link } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import TopBar from "./components/TopBar";
import { photosStore } from "./utils/store";
import CatPage from "./pages/catpage/CatPage";
import history from './utils/history'
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Route
          exact
          path="/"
          component={props => (
            <HomePage {...props} photosStore={photosStore} />
          )}
        />
        <Route
          path="/upload"
          component={props => (
            <CatPage {...props} photosStore={photosStore} />
          )}
        />
      </Router>
    </div>
  );
}
export default App;
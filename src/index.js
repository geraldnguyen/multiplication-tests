import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import TestBoard from "./TestBoard";

function App() {
  return (
    <div className="App">
      <TestBoard />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

import React from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from 'react-beautiful-dnd'; // Step 1: Import DragDropContext

import App from "./App";

const handleDragEnd = (result) => {
    // Intentionally not using the result parameter

};
  

ReactDOM.render(
  <DragDropContext onDragEnd={handleDragEnd}> {/* Step 2: Wrap your root component */}
    <App />
  </DragDropContext>,
  document.getElementById("root")
);
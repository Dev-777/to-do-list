import React from "react";
import ToDoList from "./Components/ToDoList/Components/ToDoList/ToDoList";
import { Provider } from "react-redux";
import { store } from "./Components/ToDoList/Store/Store";

function App() {
  return (
    <Provider store={store}>
      <ToDoList />
    </Provider>
  );
}

export default App;

import { loadState, saveState } from "./localStorage";
import { configureStore } from "@reduxjs/toolkit";

//Store Setup
const preloadedState = loadState();

const store = configureStore({
  reducer: {},
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveState({
    todos: { list: state.todos.list, idCounter: state.todos.idCounter }, //only adding parts so that we load a new date and reset the active id each time we load
    filters: store.getState().filters,
  });
});

export default store;

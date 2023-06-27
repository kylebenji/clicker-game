import { loadState, saveState } from "./localStorage";
import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./viewSlice";
import upgradesReducer from "./upgradesSlice";
import statsReducer from "./statsSlice";

//Store Setup
const preloadedState = loadState();

const store = configureStore({
  reducer: {
    view: viewReducer,
    upgrades: upgradesReducer,
    stats: statsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveState({
    upgrades: state.upgrades,
    stats: state.stats,
    view: state.view,
  });
});

export default store;

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
    view: {
      //defining these so I can keep the theme but clear the rest of the view settings. would probably make more sense to just load anything that I don't define with the presets, but this accomplishes the same thing
      activeUpgradePane: "click-strength",
      theme: state.view.theme,
      showSettings: false,
      showAchivements: false,
    },
  });
});

export default store;

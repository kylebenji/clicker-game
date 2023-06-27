import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "view",
  initialState: {
    activeUpgradePane: "click-strength",
    theme: "light",
    showSettings: false,
    showAchievements: false,
  },
  reducers: {
    changeView: (state, action) => {
      state.activeUpgradePane = action.payload.upgradePane;
    },
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
    setShowSettings: (state, action) => {
      state.showSettings = action.payload.showSettings;
    },
    setShowAchievements: (state, action) => {
      state.showAchievements = action.payload.showAchievements;
    },
  },
});

export const { changeView, setTheme, setShowSettings, setShowAchievements } =
  viewSlice.actions;

export default viewSlice.reducer;

export const selectUpgradePane = (state) => state.view.activeUpgradePane;
export const selectTheme = (state) => state.view.theme;
export const selectShowSettings = (state) => state.view.showSettings;
export const selectShowAchievements = (state) => state.view.showAchievements;

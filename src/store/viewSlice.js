import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "view",
  initialState: {
    activeUpgradePane: "click-strength",
    theme: "light",
  },
  reducers: {
    changeView: (state, action) => {
      state.activeUpgradePane = action.payload.upgradePane;
    },
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
  },
});

export const { changeView, setTheme } = viewSlice.actions;

export default viewSlice.reducer;

export const selectUpgradePane = (state) => state.view.activeUpgradePane;
export const selectTheme = (state) => state.view.theme;

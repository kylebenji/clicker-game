import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "view",
  initialState: {
    activeUpgradePane: "click-strength",
  },
  reducers: {
    changeView: (state, action) => {
      state.activeUpgradePane = action.payload.upgradePane;
    },
  },
});

export const { changeView } = viewSlice.actions;

export default viewSlice.reducer;

export const selectUpgradePane = (state) => state.view.activeUpgradePane;

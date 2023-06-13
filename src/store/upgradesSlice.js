import { createSlice } from "@reduxjs/toolkit";
import upgrades from "./upgrades.json";

const upgradesSlice = createSlice({
  name: "upgrades",
  initialState: upgrades,
  reducers: {
    buyUpgrade: (state, action) => {
      //check if can afford?
      //buy upgrade, get data from the action for which upgrade
      //increase upgrade cost
      //dispatch the increase click strength actions and the like from here?? I could also dispatch them from the same place I dispatch this action, but it might make more sense to do it from here.
    },
  },
});

export const {} = upgradesSlice.actions;

export default upgradesSlice.reducer;

export const selectStats = (state) => state.stats;

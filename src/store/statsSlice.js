import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    onions: 0,
    totalOnions: 0,
    onionsPerSec: 0,
    clickStr: 1,
    numClicks: 0,
    lastSaveTime: new Date().getTime(),
  },
  reducers: {
    addOnions: (state, action) => {
      state.onions += action.payload.onions;
      state.totalOnions += action.payload.onions;
      state.lastSaveTime = new Date().getTime();
    },
    decrementOnions: (state, action) => {
      state.onions -= action.payload.onions;
      state.lastSaveTime = new Date().getTime();
    },
    addOnionsPerSec: (state, action) => {
      state.onionsPerSec += action.payload.perSecIncrease;
      state.lastSaveTime = new Date().getTime();
    },
    addClickStr: (state, action) => {
      state.clickStr += action.payload.clickStrIncrease;
      state.lastSaveTime = new Date().getTime();
    },
    addClick: (state, action) => {
      state.numClicks++;
      state.lastSaveTime = new Date().getTime();
    },
  },
});

export const {
  addOnions,
  decrementOnions,
  addOnionsPerSec,
  addClickStr,
  addClick,
} = statsSlice.actions;

export default statsSlice.reducer;

export const selectStats = (state) => state.stats;

export const selectOnions = (state) => state.stats.onions;
export const selectTotalOnions = (state) => state.stats.totalOnions;
export const selectOnionsPerSec = (state) => state.stats.onionsPerSec;
export const selectClickStr = (state) => state.stats.clickStr;
export const selectNumClicks = (state) => state.stats.numClicks;
export const selectLastSaveTime = (state) => state.stats.lastSaveTime;

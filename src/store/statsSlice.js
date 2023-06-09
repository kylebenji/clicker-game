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
    lastTotalOnions: 0,
    totalOnionsPerSec: 0,
    maxOnionsPerSec: 0,
  },
  reducers: {
    addOnions: (state, action) => {
      //add an amount of onions to the current and total
      state.onions += action.payload.onions;
      state.totalOnions += action.payload.onions;
      state.lastSaveTime = new Date().getTime();
      if (action.payload.offline) {
        state.lastTotalOnions = state.totalOnions;
      }
    },
    decrementOnions: (state, action) => {
      //remove onions from current
      state.onions -= action.payload.onions;
      state.lastSaveTime = new Date().getTime();
    },
    addOnionsPerSec: (state, action) => {
      //increase the autclick amount
      state.onionsPerSec += action.payload.perSecIncrease;
      state.lastSaveTime = new Date().getTime();
    },
    addClickStr: (state, action) => {
      // increase the click strength by an amount
      state.clickStr += action.payload.clickStrIncrease;
      state.lastSaveTime = new Date().getTime();
    },
    addClick: (state, action) => {
      //add a click to the total stat
      state.numClicks++;
      state.lastSaveTime = new Date().getTime();
    },
    setPerSec: (state, action) => {
      //save to per sec
      state.onionsPerSec = action.payload.newPerSec;
    },
    setTotalOnionsPerSec: (state, action) => {
      const newTotalOPS = state.totalOnions - state.lastTotalOnions;
      state.totalOnionsPerSec = newTotalOPS;
      if (newTotalOPS > state.maxOnionsPerSec || isNaN(state.maxOnionsPerSec)) {
        state.maxOnionsPerSec = newTotalOPS;
      }
      state.lastTotalOnions = state.totalOnions;
    },
  },
});

export const {
  addOnions,
  decrementOnions,
  addOnionsPerSec,
  addClickStr,
  addClick,
  setPerSec,
  setTotalOnionsPerSec,
} = statsSlice.actions;

export default statsSlice.reducer;

export const selectStats = (state) => state.stats;

export const selectOnions = (state) => state.stats.onions;
export const selectTotalOnions = (state) => state.stats.totalOnions;
export const selectOnionsPerSec = (state) => state.stats.onionsPerSec;
export const selectClickStr = (state) => state.stats.clickStr;
export const selectNumClicks = (state) => state.stats.numClicks;
export const selectLastSaveTime = (state) => state.stats.lastSaveTime;

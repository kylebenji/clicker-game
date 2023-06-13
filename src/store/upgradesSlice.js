import { createSlice } from "@reduxjs/toolkit";
import upgrades from "./upgrades.json";

const upgradesSlice = createSlice({
  name: "upgrades",
  initialState: upgrades,
  reducers: {
    buyUpgrade: (state, action) => {
      const type = action.payload.upgradeType;
      const name = action.payload.upgradeName;
      const upgrade = state[type][name];
      //buy upgrade, get data from the action for which upgrade
      if (type === "manager") {
      } else {
        upgrade.count++;
        //increase upgrade cost
        upgrade.cost = Math.floor(upgrade.cost * 1.2);
      }
    },
  },
});

export const { buyUpgrade } = upgradesSlice.actions;

export default upgradesSlice.reducer;

export const selectUpgrades = (state) => state.upgrades;

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
      switch (type) {
        case "managers":
          //set owned status and turn on automatically
          upgrade.owned = true;
          upgrade.on = true;
          upgrade.cost = "none";
          break;
        case "autoclick-upgrades":
          //update strength of respective upgrades
          state.autoclick[upgrade.upgrades].perSecIncrease += upgrade.increase;
        //falls through
        default:
          upgrade.count++;
          //increase upgrade cost
          upgrade.cost = Math.floor(upgrade.cost * 1.2);
          break;
      }
    },
    toggleManager: (state, action) => {
      const manager = state.managers[action.payload.manager];
      manager.on = !manager.on;
    },
    toggleAllManagers: (state, action) => {
      for (const manager of Object.keys(state.managers)) {
        if (!state.managers[manager].owned) continue;
        state.managers[manager].on = action.payload.managersOn;
      }
    },
  },
});

export const { buyUpgrade, toggleManager, toggleAllManagers } =
  upgradesSlice.actions;

export default upgradesSlice.reducer;

export const selectUpgrades = (state) => state.upgrades;

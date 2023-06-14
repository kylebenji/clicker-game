import {
  addClickStr,
  addOnionsPerSec,
  decrementOnions,
  setPerSec,
} from "./store/statsSlice";
import store from "./store/store";
import { buyUpgrade } from "./store/upgradesSlice";

export const displayNum = function (num) {
  if (num === "none") return "-";
  if (num > 1000) return `${num / 1000}k`;
  return num;
};

export function handleBuyUpgrade(upgradeType, upgradeName) {
  let state = store.getState();
  let upgrades = state.upgrades;

  const upgrade = upgrades[upgradeType][upgradeName];

  if (upgradeType === "manager" && upgrade.owned) return false;
  if (state.stats.onions < upgrade.cost) return false;

  store.dispatch(decrementOnions({ onions: upgrade.cost }));
  store.dispatch(buyUpgrade({ upgradeType, upgradeName }));

  switch (upgradeType) {
    case "click-strength":
      store.dispatch(addClickStr({ clickStrIncrease: upgrade.clickIncrease }));
      break;
    case "autoclick":
      store.dispatch(
        addOnionsPerSec({ perSecIncrease: upgrade.perSecIncrease })
      );
      break;
    case "autoclick-upgrades":
      upgrades = store.getState().upgrades; //get new state since we've changed it since we got it the first time.
      //recalculate the click per second with the updates to autclickers
      let newPerSec = 0;
      for (const data of Object.values(upgrades.autoclick)) {
        newPerSec += data.count * data.perSecIncrease;
      }
      store.dispatch(setPerSec({ newPerSec }));
      break;
    default:
      break;
  }
}

export function canAfford(cost) {
  const state = store.getState();
  return cost <= state.stats.onions;
}

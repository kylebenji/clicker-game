import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import ClickerGame from "./Components/ClickerGame";
import { Provider } from "react-redux";
import store from "./store/store";
import { addOnions } from "./store/statsSlice";
import { canAfford, handleBuyUpgrade } from "./helpers";

//offline onions
function handleOfflineOnions() {
  //calculate onions using the store
  const state = store.getState();
  const lastSave = state.stats.lastSaveTime;
  const currentTime = new Date().getTime();
  const onionsPerSec = state.stats.onionsPerSec;

  const offlineOnions = Math.floor(
    ((currentTime - lastSave) / 1000) * onionsPerSec
  );
  //if there are onions then alert about them and add them to the store
  if (offlineOnions) {
    alert(`You chopped ${offlineOnions} onions while offline!`);
    store.dispatch(addOnions({ onions: offlineOnions }));
  }
}

//interval
function intervalHandler() {
  //autochop
  const state = store.getState();
  if (state.stats.onionsPerSec > 0) {
    store.dispatch(addOnions({ onions: state.stats.onionsPerSec }));
  }
  //managers BUG something about this is cauusing a freeze, need to hunt it down.
  for (const [manager, data] of Object.entries(state.upgrades.managers)) {
    if (!data.owned || !data.on) continue;
    for (const upgrade of data.upgrades) {
      while (canAfford(state.upgrades[data.upgradeType][upgrade].cost)) {
        handleBuyUpgrade(data.upgradeType, upgrade);
      }
    }
  }
}

//initialize offline onions and intervals
function init() {
  //calculate offline onions
  handleOfflineOnions();

  //intervals
  const interval = setInterval(intervalHandler, 1000);
}
init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ClickerGame />
    </Provider>
  </React.StrictMode>
);

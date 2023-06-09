import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import ClickerGame from "./Components/ClickerGame";
import { Provider } from "react-redux";
import store from "./store/store";
import { addOnions, setTotalOnionsPerSec } from "./store/statsSlice";
import { canAfford, handleBuyUpgrade } from "./helpers";

//offline onions
function handleOfflineOnions() {
  //calculate onions using the store
  const state = store.getState();
  const format = new Intl.NumberFormat("en-US");
  const lastSave = state.stats.lastSaveTime;
  const currentTime = new Date().getTime();
  const onionsPerSec = state.stats.onionsPerSec;

  const offlineOnions = Math.floor(
    ((currentTime - lastSave) / 1000) * onionsPerSec
  );
  //if there are onions then alert about them and add them to the store
  if (offlineOnions) {
    alert(`You chopped ${format.format(offlineOnions)} onions while offline!`);
    store.dispatch(addOnions({ onions: offlineOnions, offline: true }));
  }
}

//interval
function intervalHandler() {
  const state = store.getState();

  //autochop
  if (state.stats.onionsPerSec > 0) {
    store.dispatch(addOnions({ onions: state.stats.onionsPerSec }));
  }

  //onions per second stat
  store.dispatch(setTotalOnionsPerSec());

  //managers
  //there was a bug to do with the while loop on the cost, changing it to an if statement seems to have fixed it. The if statement should be fine for now since it will give the managers an opportunity to buy at least one of each thing they can afford rather than throwing all the money into the first one
  for (const data of Object.values(state.upgrades.managers)) {
    if (!data.owned || !data.on) continue;
    for (const upgrade of data.upgrades) {
      if (canAfford(state.upgrades[data.upgradeType][upgrade].cost)) {
        //if statement to avoid freeze
        handleBuyUpgrade(data.upgradeType, upgrade);
      }
    }
  }
}

//initialize offline onions and intervals
function init() {
  //load proper theme
  document.querySelector("html").dataset.bsTheme = store.getState().view.theme;

  //calculate offline onions
  handleOfflineOnions();

  //intervals
  setInterval(intervalHandler, 1000);
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

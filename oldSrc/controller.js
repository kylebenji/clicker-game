import * as helpers from "./helpers.js";
import * as model from "./model.js";

import statsView from "./views/statsView.js";
import upgradePaneView from "./views/upgradePaneView.js";

//functions
// const onionClick = function () {
//   //increment onions
//   model.addOnions(model.stats.clickStr);
//   statsView.updateOnions(model.stats);

//   //increment click count
//   model.click();
//   statsView.updateTotClicks(model.stats);
// };

// const decrementOnions = function (cost) {
//   model.stats.onions -= cost;
//   statsView.updateOnions(model.stats);
// };

const buyClickStrengthUpgrade = function (upgrade, element) {
  if (!element) {
    element = document.querySelector(`#${upgrade}`);
  }
  upgrade = model.state.clickUpgObj[upgrade];
  if (model.stats.onions >= upgrade.cost) {
    decrementOnions(upgrade.cost);
    model.stats.clickStr += upgrade.clickIncrease;
    upgradePaneView.updateCostCount(upgrade, element);
    statsView.updatePerClick(model.stats);
  }
};

const buyAutoclicker = function (upgrade, element) {
  if (!element) {
    element = document.querySelector(`#${upgrade}`);
  }
  upgrade = model.state.autoclickObj[upgrade];
  if (model.stats.onions >= upgrade.cost) {
    decrementOnions(upgrade.cost);
    model.stats.onionsPerSec += upgrade.perSecIncrease;
    upgradePaneView.updateCostCount(upgrade, element);
    statsView.updatePerSecond(model.stats);
  }
};

const recalculatePerSecond = function () {
  let perSec = 0;
  for (const [clicker, data] of Object.entries(model.state.autoclickObj)) {
    perSec += data.count * data.perSecIncrease;
  }
  console.log(perSec);
  model.stats.onionsPerSec = perSec;
  statsView.updatePerSecond(model.stats);
};

const buyAutoclickUp = function (upgrade, element) {
  if (!element) {
    element = document.querySelector(`#${upgrade}`);
  }
  upgrade = model.state.autoclickUpObj[upgrade];
  if (model.stats.onions >= upgrade.cost) {
    decrementOnions(upgrade.cost);
    upgradePaneView.updateCostCount(upgrade, element);
    model.state.autoclickObj[upgrade.upgrades].perSecIncrease +=
      upgrade.increase;
    recalculatePerSecond();
  }
};

const buyManager = function (upgrade, element) {
  upgrade = model.state.managersObj[upgrade];
  if (model.canAfford(upgrade.cost) && !upgrade.owned) {
    decrementOnions(upgrade.cost);
    upgrade.owned = upgrade.on = true;
    element.querySelector("button").style.display = "none";
    element.querySelector(".owned").textContent = `Yes`;
    const toggle = element.querySelector(".toggleOnOff");
    element.querySelector(".slider").classList.add("slider-on");
    toggle.disabled = false;
    toggle.checked = true;
  }
};

const upgBuyMap = new Map([
  ["click-strength-upgrade", buyClickStrengthUpgrade],
  ["autoclicker", buyAutoclicker],
  ["autoclickUp", buyAutoclickUp],
  ["manager", buyManager],
]);

const buyUpgrade = function (element) {
  let parent = element.closest(".upgrade");
  let upgrade = parent.id;
  upgBuyMap.forEach((val, key, map) => {
    if (parent.classList.contains(key)) {
      val(upgrade, parent);
    }
  });
};

const toggleManager = function (toggle) {
  let manager = model.state.managersObj[toggle.closest(".upgrade").id];
  if (!manager.owned) return;
  manager.on = !manager.on;
  toggle.checked = manager.on ? true : false;
};

//autochopper
// const autochopFunc = function () {
//   model.addOnions(model.stats.onionsPerSec);
//   statsView.updateOnions(model.stats);
// };

const managerPurchaseMap = new Map([
  ["clickUpgObj", buyClickStrengthUpgrade],
  ["autoclickObj", buyAutoclicker],
  ["autoclickUpObj", buyAutoclickUp],
]);

//managers
const managerHandler = function () {
  for (const [manager, data] of Object.entries(model.state.managersObj)) {
    if (!data.owned || !data.on) continue;
    for (const upgrade of data.upgrades) {
      console.log(data.upgradeType);
      while (model.canAfford(model.state[data.upgradeType][upgrade].cost)) {
        managerPurchaseMap.get(data.upgradeType)(upgrade);
      }
    }
  }
};

//offline onions
const controlOfflineOnions = function (offlineOnions) {
  alert(`You chopped ${offlineOnions} onions while offline!`);
  model.addOnions(offlineOnions);
  statsView.updateOnions(model.stats);
};

//init
const init = function () {
  //load saved data
  // model.loadLocalStorage();

  //calculate offline onions
  const offlineOnions = model.calculateOfflineOnions();
  if (offlineOnions) controlOfflineOnions(offlineOnions);

  //starting upgrades
  // upgradePaneView.generateAllTabsMarkup(model.state);

  //update displays
  // statsView.updateAll(model.stats);

  //autosave
  const saveInterval = setInterval(model.saveLocalStorage, 5000);

  //intervals
  const managerInterval = setInterval(managerHandler, 1000);
  const autochopInterval = setInterval(autochopFunc, 1000);

  //event listeners
  // statsView.addHandlerChop(onionClick);
  upgradePaneView.addHandlerBuy(buyUpgrade);
  upgradePaneView.addHandlerToggleManager(toggleManager);
};
init();

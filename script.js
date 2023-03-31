//buttons
const btnServe = document.querySelector("#serve");
const btnClickUp = document.querySelector("#click-upgrades");
const btnAutoPurch = document.querySelector("#autoclick-purchases");
const btnAutoUp = document.querySelector("#autoclick-upgrades");
const upgButtons = [btnClickUp, btnAutoPurch, btnAutoUp];
const btnsBuy = document.getElementsByClassName("buy");

//DOM elements
const count = document.querySelector("#count");
const clickUpgradesDiv = document.querySelector("#click-strength");
const autoPurchasesDiv = document.querySelector("#autoclick");
const autoUpgradesDiv = document.querySelector("#auto-up");
const upgradePanes = [clickUpgradesDiv, autoPurchasesDiv, autoUpgradesDiv];
const onionPerClick = document.querySelector("#onion-per-click");
const onionPerSecond = document.querySelector("#onion-per-second");

//variables
let onionChopped = 0;

//upgrades objects
const clickUpgradesObj = {
  clickStrIncrease: 0,
  upgrades: {
    fryingPan: {
      name: "Paring Knife",
      description: "Just a lil knife. Increases click strength by 1",
      count: 0,
      cost: 10,
      clickIncrease: 1,
    },
    chefsKnife: {
      name: "Chef's Knife",
      description: "Now we're talking! Increase click strength by 5",
      count: 0,
      cost: 100,
      clickIncrease: 5,
    },
    knifeTraining: {
      name: "Train knife skills",
      description: "Chop faster! Increases click strength by 10",
      count: 0,
      cost: 500,
      clickIncrease: 10,
    },
    ambidextrous: {
      name: "Ambidexterity",
      description: "Work with both hands! Increases click strength by 25",
      count: 0,
      cost: 1000,
      clickIncrease: 25,
    },
  },
};

const autoclickObj = {
  onionsPerSec: 0,
  clickers: {
    busboy: {
      name: "Grab Busboy",
      description:
        "grab a busboy from the floor to help you chop. not very fast, but they've got spirit. +1 chops per second",
      count: 0,
      cost: 500,
      perSecIncrease: 1,
    },
    newCook: {
      name: "Hire another Cook",
      description: "Hire another prep cook. +10 chops per second",
      count: 0,
      cost: 5000,
      perSecIncrease: 10,
    },
    autochopper: {
      name: "Automated Chopper",
      description: "basic autochopper. Loud, but can chop 25 onions a second",
      count: 0,
      cost: 25000,
      perSecIncrease: 25,
    },
  },
};

//setup
const initializeUpgrades = function () {
  for (const [upgrade, data] of Object.entries(clickUpgradesObj.upgrades)) {
    //create div section
    let upgradeDiv = document.createElement("div");
    upgradeDiv.classList.add("click-strength-upgrade", "upgrade");
    upgradeDiv.id = upgrade;
    //add title
    let title = document.createElement("h3");
    title.textContent = data.name;
    upgradeDiv.appendChild(title);
    //add description
    let description = document.createElement("p");
    description.textContent = data.description;
    upgradeDiv.appendChild(description);
    //add count
    let upgCount = document.createElement("p");
    upgCount.textContent = `Count: ${data.count}`;
    upgCount.classList.add("count");
    upgradeDiv.appendChild(upgCount);
    //add cost
    let upgCost = document.createElement("p");
    upgCost.textContent = `Cost: ${data.cost}`;
    upgCost.classList.add("cost");
    upgradeDiv.appendChild(upgCost);
    //add buy button
    let upgBuyBtn = document.createElement("button");
    upgBuyBtn.textContent = `Buy`;
    upgBuyBtn.classList.add("buy");
    upgradeDiv.appendChild(upgBuyBtn);
    clickUpgradesDiv.appendChild(upgradeDiv);
  }
  for (const [clicker, data] of Object.entries(autoclickObj.clickers)) {
    //create div section
    let upgradeDiv = document.createElement("div");
    upgradeDiv.classList.add("autoclicker", "upgrade");
    upgradeDiv.id = clicker;
    //add title
    let title = document.createElement("h3");
    title.textContent = data.name;
    upgradeDiv.appendChild(title);
    //add description
    let description = document.createElement("p");
    description.textContent = data.description;
    upgradeDiv.appendChild(description);
    //add count
    let upgCount = document.createElement("p");
    upgCount.textContent = `Count: ${data.count}`;
    upgCount.classList.add("count");
    upgradeDiv.appendChild(upgCount);
    //add cost
    let upgCost = document.createElement("p");
    upgCost.textContent = `Cost: ${data.cost}`;
    upgCost.classList.add("cost");
    upgradeDiv.appendChild(upgCost);
    //add buy button
    let upgBuyBtn = document.createElement("button");
    upgBuyBtn.textContent = `Buy`;
    upgBuyBtn.classList.add("buy");
    upgradeDiv.appendChild(upgBuyBtn);
    autoPurchasesDiv.appendChild(upgradeDiv);
  }
};
initializeUpgrades();

//functions

const updateOnions = function () {
  count.textContent = onionChopped;
};

const chopOnion = function () {
  onionChopped = onionChopped + 1 + clickUpgradesObj.clickStrIncrease;
  updateOnions();
};

const decrementOnions = function (cost) {
  onionChopped -= cost;
  count.textContent = onionChopped;
};

const showUpgradePane = function (selPane) {
  for (const [i, pane] of upgradePanes.entries()) {
    if (pane === selPane) {
      pane.classList.remove("hidden");
      upgButtons[i].classList.add("selected");
    } else {
      pane.classList.add("hidden");
      upgButtons[i].classList.remove("selected");
    }
  }
};

const updateCostCount = function (upgrade, element) {
  upgrade.count++;
  element.querySelector(".count").textContent = `Count: ${upgrade.count}`;
  upgrade.cost = Math.floor(upgrade.cost * 1.2);
  element.querySelector(".cost").textContent = `Cost: ${upgrade.cost}`;
};

const updatePerClick = function () {
  onionPerClick.textContent = `Onions per click: ${
    clickUpgradesObj.clickStrIncrease + 1
  }`;
};

const updatePerSecond = function () {
  onionPerSecond.textContent = `Onions per second: ${autoclickObj.onionsPerSec}`;
};

const buyClickStrengthUpgrade = function (upgrade, element) {
  upgrade = clickUpgradesObj.upgrades[upgrade];
  if (onionChopped >= upgrade.cost) {
    decrementOnions(upgrade.cost);
    clickUpgradesObj.clickStrIncrease += upgrade.clickIncrease;
    updateCostCount(upgrade, element);
    updatePerClick();
  }
};

const buyAutoclicker = function (upgrade, element) {
  upgrade = autoclickObj.clickers[upgrade];
  if (onionChopped >= upgrade.cost) {
    decrementOnions(upgrade.cost);
    autoclickObj.onionsPerSec += upgrade.perSecIncrease;
    updateCostCount(upgrade, element);
    updatePerSecond();
  }
};

const buyUpgrade = function (element) {
  let parent = this.parentElement;
  let upgrade = parent.id;
  if (parent.classList.contains("click-strength-upgrade")) {
    buyClickStrengthUpgrade(upgrade, parent);
  } else if (parent.classList.contains("autoclicker")) {
    buyAutoclicker(upgrade, parent);
  }
};

//autochopper
const autochopFunc = function () {
  onionChopped += autoclickObj.onionsPerSec;
  updateOnions();
};

const autoshopInterval = setInterval(autochopFunc, 1000);

//event listeners
btnServe.addEventListener("click", chopOnion);
btnClickUp.addEventListener("click", function () {
  showUpgradePane(clickUpgradesDiv);
});
btnAutoPurch.addEventListener("click", function () {
  showUpgradePane(autoPurchasesDiv);
});
btnAutoUp.addEventListener("click", function () {
  showUpgradePane(autoUpgradesDiv);
});
Array.from(btnsBuy).forEach(function (element) {
  element.addEventListener("click", buyUpgrade);
});

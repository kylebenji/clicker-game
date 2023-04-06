//buttons
const btnServe = document.querySelector("#serve");
const btnClickUp = document.querySelector("#click-upgrades");
const btnAutoPurch = document.querySelector("#autoclick-purchases");
const btnAutoUp = document.querySelector("#autoclick-upgrades");
const btnManagers = document.querySelector("#managers-btn");
const upgButtons = [btnClickUp, btnAutoPurch, btnAutoUp, btnManagers];
const btnsBuy = document.getElementsByClassName("buy");

//DOM elements
const count = document.querySelector("#count");
const clickUpgradesDiv = document.querySelector("#click-strength");
const autoPurchasesDiv = document.querySelector("#autoclick");
const autoUpgradesDiv = document.querySelector("#auto-up");
const managersDiv = document.querySelector("#managers");
const upgradePanes = [
  clickUpgradesDiv,
  autoPurchasesDiv,
  autoUpgradesDiv,
  managersDiv,
];
const onionPerClick = document.querySelector("#onion-per-click");
const onionPerSecond = document.querySelector("#onion-per-second");

//variables
let onionChopped = 0;

//upgrades objects
const clickUpgradesObj = {
  clickStrIncrease: 0,
  upgrades: {
    paringKnife: {
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
        "Grab a busboy from the floor to help you chop. Not very fast, but they've got spirit. +1 chops per second",
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
      description: "Basic autochopper. Loud, but can chop 25 onions a second",
      count: 0,
      cost: 25000,
      perSecIncrease: 25,
    },
  },
};

const managersObj = {
  managers: {
    knifeSharpener: {
      name: "Knife Sharpener",
      description:
        "Sharpen your knives regularly! Automatically purchases the Paring knife and Chef's Knife upgrades when they become available",
      owned: false,
      cost: 10000,
      upgrades: ["paringKnife", "chefsKnife"],
      upgradeType: "clickUpgrades",
    },
  },
};

//setup
const initializeUpgrades = function () {
  for (const [upgrade, data] of Object.entries(clickUpgradesObj.upgrades)) {
    let clickUpgradehtml = `
      <div class="click-strength-upgrade upgrade" id="${upgrade}">
        <h3>${data.name}</h3>
        <p>${data.description}</p>
        <p class="count">Count: ${data.count}</p>
        <p class="cost">Cost: ${data.cost}</p>
        <button class="buy">Buy</button>
      </div>
      `;
    clickUpgradesDiv.insertAdjacentHTML("beforeend", clickUpgradehtml);
  }
  for (const [clicker, data] of Object.entries(autoclickObj.clickers)) {
    let autoClickerDivHTML = `
    <div class="autoclicker upgrade" id="${clicker}">
      <h3>${data.name}</h3>
      <p>${data.description}</p>
      <p class="count">Count: ${data.count}</p>
      <p class="cost">Cost: ${data.cost}</p>
      <button class="buy">Buy</button>
    </div>
    `;
    autoPurchasesDiv.insertAdjacentHTML("beforeend", autoClickerDivHTML);
  }
  for (const [manager, data] of Object.entries(managersObj.managers)) {
    let managerHTML = `
    <div class="manager upgrade" id="${manager}">
      <h3>${data.name}</h3>
      <p>${data.description}</p>
      <p class="owned">Owned?: ${data.owned}</p>
      <p class="cost">Cost: ${data.cost}</p>
      <button class="buy">Buy</button>
    </div>`;
    managersDiv.insertAdjacentHTML("beforeend", managerHTML);
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
  if (!element) {
    element = document.querySelector(`#${upgrade}`);
  }
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

const buyManager = function (upgrade, element) {
  upgrade = managersObj.managers[upgrade];
  if (onionChopped >= upgrade.cost && !upgrade.owned) {
    decrementOnions(upgrade.cost);
    upgrade.owned = true;
    element.querySelector(".owned").textContent = `Owned: ${upgrade.owned}`;
  }
};

const buyUpgrade = function (element) {
  let parent = this.parentElement;
  let upgrade = parent.id;
  if (parent.classList.contains("click-strength-upgrade")) {
    buyClickStrengthUpgrade(upgrade, parent);
  } else if (parent.classList.contains("autoclicker")) {
    buyAutoclicker(upgrade, parent);
  } else if (parent.classList.contains("manager")) {
    buyManager(upgrade, parent);
  }
};

//autochopper
const autochopFunc = function () {
  onionChopped += autoclickObj.onionsPerSec;
  updateOnions();
};

const autoshopInterval = setInterval(autochopFunc, 1000);

//managers
const managerHandler = function () {
  for (const [manager, data] of Object.entries(managersObj.managers)) {
    if (data.owned) {
      for (const upgrade of data.upgrades) {
        if (data.upgradeType === "clickUpgrades") {
          while (clickUpgradesObj.upgrades[upgrade].cost < onionChopped) {
            buyClickStrengthUpgrade(upgrade);
          }
        }
      }
    }
  }
};

const managerInterval = setInterval(managerHandler, 1000);

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
btnManagers.addEventListener("click", function () {
  showUpgradePane(managersDiv);
});
Array.from(btnsBuy).forEach(function (element) {
  element.addEventListener("click", buyUpgrade);
});

//buttons
const btnChop = document.querySelector("#serve");
const btnUpgTabs = document.querySelectorAll(".upgrade-tab-btn");
const btnsBuy = document.getElementsByClassName("buy");

//DOM elements
const count = document.querySelector("#count");
const clickUpgradesDiv = document.querySelector("#click-strength");
const autoPurchasesDiv = document.querySelector("#autoclick");
const autoUpgradesDiv = document.querySelector("#auto-up");
const managersDiv = document.querySelector("#managers");
const upgradePanes = document.querySelectorAll(".upgrades-pane");
const onionPerClick = document.querySelector("#onion-per-click");
const onionPerSecond = document.querySelector("#auto-onion-per-second");
const totalOnionsStat = document.querySelector("#total-onions");
const totalClicksStat = document.querySelector("#total-clicks");
const upgradesContainer = document.querySelector(".upgrades");
const tabNav = document.querySelector("#upgrade-select");

//variables
const stats = {
  onions: 0,
  totalOnions: 0,
  onionsPerSec: 0,
  clickStr: 1,
  numClicks: 0,
};

//upgrades objects
const clickUpgradesObj = {
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
    armGlaives: {
      name: "Full Arm Glaives",
      description:
        "Full arm knives like Batman, increases click strength by 100",
      count: 0,
      cost: 1500,
      clickIncrease: 100,
    },
    headbutting: {
      name: "Headbutting",
      description:
        "You've figured out how to headbutt onions into a perfect dice! Increases click strength by 250",
      count: 0,
      cost: 8600,
      clickIncrease: 250,
    },
    ninjaTraining: {
      name: "Ninja Training",
      description:
        "Take a break to train with ninjas! Increases click strength by 500",
      count: 0,
      cost: 12000,
      clickIncrease: 500,
    },
    oneWithTheOnion: {
      name: "One with the Onion",
      description:
        "Become One with the onion, let the knowledge of its layers flow through you. Increases click strength by 1250",
      count: 0,
      cost: 40000,
      clickIncrease: 1250,
    },
    ogres: {
      name: "Ogres",
      description: "Ogres are like onions. Increases click strength by 5000",
      count: 0,
      cost: 110000,
      clickIncrease: 5000,
    },
  },
};

const autoclickObj = {
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
    angryMonkeys: {
      name: "Herd of angry monkeys with knives",
      description:
        "Not necessarily up to food code, but they have the fervor. Can chop 100 onions per second",
      count: 0,
      cost: 100000,
      perSecIncrease: 100,
    },
    oldPrepCook: {
      name: "One (1) old prep cook",
      description:
        "They've been doing this longer than you or your parents have been alive, just get out of the way. Can chop 750 onions per second.",
      count: 0,
      cost: 500000,
      perSecIncrease: 750,
    },
    deluxeChopper: {
      name: "The Deluxe Autochopping system",
      description:
        "This top of the line system recently released by Onions Inc. can chop 2500 onions per second, but requires the purchase of an entire building to house it",
      count: 0,
      cost: 1000000,
      perSecIncrease: 2500,
    },
  },
};

const autoclickUpObj = {
  autoclickUps: {
    busboyHype: {
      name: "Hype up your Busboys",
      description:
        "Encourage the busboys to chop faster!! Increases busboy chop speed by 1 onion per second",
      count: 0,
      cost: 4200,
      upgrades: "busboy",
      increase: 1,
    },
    cookBonus: {
      name: "Give Cook a Bonus",
      description:
        "Give your cooks a bonus!! Increases cook chop speed by 3 onions per second",
      count: 0,
      cost: 12500,
      upgrades: "newCook",
      increase: 3,
    },
    greaseChopper: {
      name: "Grease your Autochopper",
      description:
        "Maker sure the autochopper is running smoothly!! Increases chop speed by 5 onions per second",
      count: 0,
      cost: 30000,
      upgrades: "autochopper",
      increase: 5,
    },
  },
};

const managersObj = {
  managers: {
    knifeSharpener: {
      name: "Knife Sharpener",
      description:
        "Sharpen your knives regularly! Automatically purchases the Paring knife and Chef's Knife upgrades",
      owned: false,
      on: false,
      cost: 10000,
      upgrades: ["paringKnife", "chefsKnife"],
      upgradeType: "clickUpgrades",
    },
    FOHTrainer: {
      name: "Front of House Trainer",
      description:
        "Trains Front of House to use knives! Automatically purchases the 'Grab Busboy' autoclicker",
      owned: false,
      on: false,
      cost: 25000,
      upgrades: ["busboy"],
      upgradeType: "autoclicker",
    },
    trainer: {
      name: "Knife Arts Trainer",
      description:
        "Helps you hone your skills! Automatically purchases the Ambidexterity and Train Knife Skills upgrades",
      owned: false,
      on: false,
      cost: 65000,
      upgrades: ["ambidextrous", "knifeTraining"],
      upgradeType: "clickUpgrades",
    },
    martialtrainer: {
      name: "Martial Arts Trainer",
      description:
        "Helps with your martial skills! Automatically purchases the Arm Glaives, Headbutting, and Ninja training upgrades",
      owned: false,
      on: false,
      cost: 86000,
      upgrades: ["armGlaives", "headbutting", "ninjaTraining"],
      upgradeType: "clickUpgrades",
    },
    mechanic: {
      name: "Mechanic",
      description:
        "Helps you maintain your machines! Automatically purchases the Automated Chopper upgrade",
      owned: false,
      on: false,
      cost: 100000,
      upgrades: ["autochopper"],
      upgradeType: "autoclicker",
    },
    monkeyWrangler: {
      name: "Monkey Wrangler",
      description:
        "helps wrangle your monkeys so they stop attacking passerby! Automatically purchases the Herd of Angry Monkeys with Knives autoclicker",
      owned: false,
      on: false,
      cost: 250000,
      upgrades: ["angryMonkeys"],
      upgradeType: "autoclicker",
    },
  },
};

const displayNum = function (num) {
  if (num > 1000) return `${num / 1000}k`;
  return num;
};

//setup
const initializeUpgrades = function () {
  for (const [upgrade, data] of Object.entries(clickUpgradesObj.upgrades)) {
    let clickUpgradehtml = `
      <tr class="click-strength-upgrade upgrade" id="${upgrade}">
        <th scope="row" class="upg-name">${data.name}</th>
        <td>${data.description}</td>
        <td class="count">${data.count}</td>
        <td class="cost">${displayNum(data.cost)}</td>
        <td><button class="buy">Buy</button></td>
      </tr>
      `;
    clickUpgradesDiv.insertAdjacentHTML("beforeend", clickUpgradehtml);
  }
  for (const [clicker, data] of Object.entries(autoclickObj.clickers)) {
    let autoClickerDivHTML = `
    <tr class="autoclicker upgrade" id="${clicker}">
      <th scope="row" class="upg-name">${data.name}</th>
      <td>${data.description}</td>
      <td class="count">${data.count}</td>
      <td class="cost">${displayNum(data.cost)}</td>
      <td><button class="buy">Buy</button></td>
    </tr>
    `;
    autoPurchasesDiv.insertAdjacentHTML("beforeend", autoClickerDivHTML);
  }
  for (const [upgrade, data] of Object.entries(autoclickUpObj.autoclickUps)) {
    let autoClickUpDivHTML = `
    <tr class="autoclickUp upgrade" id="${upgrade}">
      <th scope="row" class="upg-name">${data.name}</th>
      <td>${data.description}</td>
      <td class="count">${data.count}</td>
      <td class="cost">${displayNum(data.cost)}</td>
      <td><button class="buy">Buy</button></td>
    </tr>
    `;
    autoUpgradesDiv.insertAdjacentHTML("beforeend", autoClickUpDivHTML);
  }
  for (const [manager, data] of Object.entries(managersObj.managers)) {
    let managerHTML = `
    <tr class="manager upgrade" id="${manager}">
      <th class="upg-name">${data.name}</th>
      <td>${data.description}</td>
      <td class="owned">${data.owned ? "Yes" : "No"}</td>
      <td class="cost">${displayNum(data.cost)}</td>
      <td><button class="buy">Buy</button></td>
      <td>
        <label class="switch">
          <input type="checkbox" class="toggleOnOff" disabled="disabled">
          <span class="slider"></span>
        </label>
      </td>
    </tr>`;
    managersDiv
      .querySelector("tbody")
      .insertAdjacentHTML("beforeend", managerHTML);
  }
};
initializeUpgrades();

//functions

const addOnions = function (num) {
  stats.onions += num;
  stats.totalOnions += num;
};

const updatePerClick = function () {
  onionPerClick.textContent = stats.clickStr;
};

const updatePerSecond = function () {
  onionPerSecond.textContent = stats.onionsPerSec;
};

const updateTotalOnions = function () {
  totalOnionsStat.textContent = stats.totalOnions;
};

const updateTotClicks = function () {
  totalClicksStat.textContent = stats.numClicks;
};

const updateOnions = function () {
  count.textContent = stats.onions;
  updateTotalOnions();
};

const onionClick = function () {
  addOnions(stats.clickStr);
  updateOnions();
  stats.numClicks += 1;
  updateTotClicks();
};

const decrementOnions = function (cost) {
  stats.onions -= cost;
  count.textContent = stats.onions;
};

const showUpgradePane = function (btn) {
  upgradePanes.forEach((div) => div.classList.add("hidden"));
  btnUpgTabs.forEach((btn) => btn.classList.remove("selected"));
  btn.classList.add("selected");
  document
    .querySelector(`.upgrades-pane--${btn.dataset.pane}`)
    .classList.remove("hidden");
};

const updateCostCount = function (upgrade, element) {
  upgrade.count++;
  element.querySelector(".count").textContent = `${upgrade.count}`;
  upgrade.cost = Math.floor(upgrade.cost * 1.2);
  element.querySelector(".cost").textContent = `${upgrade.cost}`;
};

const buyClickStrengthUpgrade = function (upgrade, element) {
  if (!element) {
    element = document.querySelector(`#${upgrade}`);
  }
  upgrade = clickUpgradesObj.upgrades[upgrade];
  if (stats.onions >= upgrade.cost) {
    decrementOnions(upgrade.cost);
    stats.clickStr += upgrade.clickIncrease;
    updateCostCount(upgrade, element);
    updatePerClick();
  }
};

const buyAutoclicker = function (upgrade, element) {
  if (!element) {
    element = document.querySelector(`#${upgrade}`);
  }
  upgrade = autoclickObj.clickers[upgrade];
  if (stats.onions >= upgrade.cost) {
    decrementOnions(upgrade.cost);
    stats.onionsPerSec += upgrade.perSecIncrease;
    updateCostCount(upgrade, element);
    updatePerSecond();
  }
};

const recalculatePerSecond = function () {
  let perSec = 0;
  for (const [clicker, data] of Object.entries(autoclickObj.clickers)) {
    perSec += data.count * data.perSecIncrease;
  }
  console.log(perSec);
  stats.onionsPerSec = perSec;
  updatePerSecond();
};

const buyAutoclickUp = function (upgrade, element) {
  if (!element) {
    element = document.querySelector(`#${upgrade}`);
  }
  upgrade = autoclickUpObj.autoclickUps[upgrade];
  if (stats.onions >= upgrade.cost) {
    decrementOnions(upgrade.cost);
    updateCostCount(upgrade, element);
    autoclickObj.clickers[upgrade.upgrades].perSecIncrease += upgrade.increase;
    recalculatePerSecond();
  }
};

const buyManager = function (upgrade, element) {
  upgrade = managersObj.managers[upgrade];
  if (stats.onions >= upgrade.cost && !upgrade.owned) {
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

const buyUpgrade = function (element) {
  let parent = element.closest(".upgrade");
  let upgrade = parent.id;
  if (parent.classList.contains("click-strength-upgrade")) {
    buyClickStrengthUpgrade(upgrade, parent);
  } else if (parent.classList.contains("autoclicker")) {
    buyAutoclicker(upgrade, parent);
  } else if (parent.classList.contains("manager")) {
    buyManager(upgrade, parent);
  } else if (parent.classList.contains("autoclickUp")) {
    buyAutoclickUp(upgrade, parent);
  }
};

const toggleManager = function (toggle) {
  let manager = managersObj.managers[toggle.closest(".upgrade").id];
  if (!manager.owned) return;
  manager.on = !manager.on;
  toggle.checked = manager.on ? true : false;
};

//autochopper
const autochopFunc = function () {
  addOnions(stats.onionsPerSec);
  updateOnions();
};

const autoshopInterval = setInterval(autochopFunc, 1000);

//managers
const managerHandler = function () {
  for (const [manager, data] of Object.entries(managersObj.managers)) {
    if (data.owned && data.on) {
      for (const upgrade of data.upgrades) {
        if (data.upgradeType === "clickUpgrades") {
          while (clickUpgradesObj.upgrades[upgrade].cost < stats.onions) {
            buyClickStrengthUpgrade(upgrade);
          }
        } else if (data.upgradeType === "autoclicker") {
          while (autoclickObj.clickers[upgrade].cost < stats.onions) {
            buyAutoclicker(upgrade);
          }
        } else if (data.upgradeType === "autoclickUpgrade") {
          while (autoclickUpObj.upgrades[upgrade].cost < stats.onions) {
            buyAutoclickUp(upgrade);
          }
        }
      }
    }
  }
};

const managerInterval = setInterval(managerHandler, 1000);

//event listeners
btnChop.addEventListener("click", onionClick);
tabNav.addEventListener("click", function (e) {
  if (!e.target.classList.contains("upgrade-tab-btn")) return;
  showUpgradePane(e.target);
});
upgradesContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("buy")) return;
  buyUpgrade(e.target);
});
managersDiv.addEventListener("change", function (e) {
  if (!e.target.classList.contains("toggleOnOff")) return;
  toggleManager(e.target);
});

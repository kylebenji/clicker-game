import * as data from "./data.json";

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
const { clickUpgradesObj, autoclickObj, autoclickUpObj, managersObj } = data;

//helpers
const displayNum = function (num) {
  if (num > 1000) return `${num / 1000}k`;
  return num;
};

//setup
const initializeUpgrades = function () {
  for (const [upgrade, data] of Object.entries(clickUpgradesObj)) {
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
  for (const [clicker, data] of Object.entries(autoclickObj)) {
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
  for (const [upgrade, data] of Object.entries(autoclickUpObj)) {
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
  for (const [manager, data] of Object.entries(managersObj)) {
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
  upgrade = clickUpgradesObj[upgrade];
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
  upgrade = autoclickObj[upgrade];
  if (stats.onions >= upgrade.cost) {
    decrementOnions(upgrade.cost);
    stats.onionsPerSec += upgrade.perSecIncrease;
    updateCostCount(upgrade, element);
    updatePerSecond();
  }
};

const recalculatePerSecond = function () {
  let perSec = 0;
  for (const [clicker, data] of Object.entries(autoclickObj)) {
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
  upgrade = autoclickUpObj[upgrade];
  if (stats.onions >= upgrade.cost) {
    decrementOnions(upgrade.cost);
    updateCostCount(upgrade, element);
    autoclickObj[upgrade.upgrades].perSecIncrease += upgrade.increase;
    recalculatePerSecond();
  }
};

const buyManager = function (upgrade, element) {
  upgrade = managersObj[upgrade];
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
  let manager = managersObj[toggle.closest(".upgrade").id];
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
  for (const [manager, data] of Object.entries(managersObj)) {
    if (!data.owned || !data.on) continue;
    for (const upgrade of data.upgrades) {
      if (data.upgradeType === "clickUpgrades") {
        while (clickUpgradesObj[upgrade].cost < stats.onions) {
          buyClickStrengthUpgrade(upgrade);
        }
      } else if (data.upgradeType === "autoclicker") {
        while (autoclickObj[upgrade].cost < stats.onions) {
          buyAutoclicker(upgrade);
        }
      } else if (data.upgradeType === "autoclickUpgrade") {
        while (autoclickUpObj.upgrades[upgrade].cost < stats.onions) {
          buyAutoclickUp(upgrade);
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

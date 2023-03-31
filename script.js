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

//variables
let custServed = 0;

//upgrades objects
const clickUpgradesObj = {
  clickStrIncrease: 0,
  upgrades: {
    fryingPan: {
      name: "Frying Pan",
      description: "Increase click strength by .1",
      count: 0,
      cost: 10,
      clickIncrease: 0.1,
    },
    chefsKnife: {
      name: "Chef's Knife",
      description: "Increase click strength by .5",
      count: 0,
      cost: 100,
      clickIncrease: 0.5,
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
};
initializeUpgrades();

//functions
const serveCustomer = function () {
  custServed = custServed + 1 + clickUpgradesObj.clickStrIncrease;
  count.textContent = custServed.toFixed(1);
};

const decrementCustomers = function (cost) {
  custServed -= cost;
  count.textContent = custServed.toFixed(1);
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

const buyClickStrengthUpgrade = function (upgrade, element) {
  upgrade = clickUpgradesObj.upgrades[upgrade];
  if (custServed >= upgrade.cost) {
    decrementCustomers(upgrade.cost);
    clickUpgradesObj.clickStrIncrease += upgrade.clickIncrease;
    upgrade.count++;
    element.querySelector(".count").textContent = `Count: ${upgrade.count}`;
    upgrade.cost = upgrade.cost * 1.2;
    element.querySelector(".cost").textContent = `Cost: ${upgrade.cost.toFixed(
      1
    )}`;
  }
};

const buyUpgrade = function (element) {
  let parent = this.parentElement;
  let upgrade = parent.id;
  if (parent.classList.contains("click-strength-upgrade")) {
    buyClickStrengthUpgrade(upgrade, parent);
  }
};

//event listeners
btnServe.addEventListener("click", serveCustomer);
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

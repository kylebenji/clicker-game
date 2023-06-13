import * as helpers from "../helpers.js";

class UpgradePaneView {
  #clickUpgradesDiv = document.querySelector("#click-strength");
  #autoPurchasesDiv = document.querySelector("#autoclick");
  #autoUpgradesDiv = document.querySelector("#auto-up");
  #managersDiv = document.querySelector("#managers");
  #upgradePanes = document.querySelectorAll(".upgrades-pane");
  #upgradesContainer = document.querySelector(".upgrades");
  #tabNav = document.querySelector("#upgrade-select");

  #btnUpgTabs = document.querySelectorAll(".upgrade-tab-btn");

  constructor() {
    this.#tabNav.addEventListener("click", this.tabNav.bind(this));
  }

  tabNav(e) {
    if (!e.target.classList.contains("upgrade-tab-btn")) return;
    this.#showUpgradePane(e.target);
  }

  insertTable(div, markup) {
    div.querySelector("tbody").insertAdjacentHTML("beforeend", markup);
  }

  generateAllTabsMarkup(model) {
    this.insertTable(
      this.#clickUpgradesDiv,
      this.#generateRegPaneMarkup(model.clickUpgObj, "click-strength-upgrade")
    );
    this.insertTable(
      this.#autoPurchasesDiv,
      this.#generateRegPaneMarkup(model.autoclickObj, "autoclicker")
    );
    this.insertTable(
      this.#autoUpgradesDiv,
      this.#generateRegPaneMarkup(model.autoclickUpObj, "autoclickUp")
    );
    this.insertTable(
      this.#managersDiv,
      this.#generateManagerMarkup(model.managersObj)
    );
  }

  #generateRegPaneMarkup(obj, type) {
    let markup = "";
    for (const [upgrade, data] of Object.entries(obj)) {
      markup += `
        <tr class="${type} upgrade" id="${upgrade}">
          <th scope="row" class="upg-name">${data.name}</th>
          <td>${data.description}</td>
          <td class="count">${data.count}</td>
          <td class="cost">${helpers.displayNum(data.cost)}</td>
          <td><button class="buy">Buy</button></td>
        </tr>
        `;
    }
    return markup;
  }

  #generateManagerMarkup(obj) {
    let markup = "";
    for (const [manager, data] of Object.entries(obj)) {
      markup += `
        <tr class="manager upgrade" id="${manager}">
          <th class="upg-name">${data.name}</th>
          <td>${data.description}</td>
          <td class="owned">${data.owned ? "Yes" : "No"}</td>
          <td class="cost">${helpers.displayNum(data.cost)}</td>
          <td><button class="buy">Buy</button></td>
          <td>
            <label class="switch">
              <input type="checkbox" class="toggleOnOff" disabled="disabled">
              <span class="slider"></span>
            </label>
          </td>
        </tr>`;
    }
    return markup;
  }

  #showUpgradePane = function (btn) {
    //hide all panes, reset all buttons
    this.#upgradePanes.forEach((div) => div.classList.add("hidden"));
    this.#btnUpgTabs.forEach((btn) => btn.classList.remove("selected"));

    //show selected pane and hightlihght clicked button
    btn.classList.add("selected");
    document
      .querySelector(`.upgrades-pane--${btn.dataset.pane}`)
      .classList.remove("hidden");
  };

  addHandlerBuy(handler) {
    this.#upgradesContainer.addEventListener("click", function (e) {
      if (!e.target.classList.contains("buy")) return;
      handler(e.target);
    });
  }

  addHandlerToggleManager(handler) {
    this.#managersDiv.addEventListener("change", function (e) {
      if (!e.target.classList.contains("toggleOnOff")) return;
      handler(e.target);
    });
  }

  updateCostCount(upgrade, element) {
    //increment count
    upgrade.count++;
    element.querySelector(".count").textContent = `${upgrade.count}`;
    upgrade.cost = Math.floor(upgrade.cost * 1.2);
    element.querySelector(".cost").textContent = `${helpers.displayNum(
      upgrade.cost
    )}`;
  }
}

export default new UpgradePaneView();

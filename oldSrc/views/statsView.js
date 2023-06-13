class StatsView {
  #onionPerClick = document.querySelector("#onion-per-click");
  #onionPerSecond = document.querySelector("#auto-onion-per-second");
  #totalOnionsStat = document.querySelector("#total-onions");
  #totalClicksStat = document.querySelector("#total-clicks");
  #count = document.querySelector("#count");
  #btnChop = document.querySelector("#onions");

  updatePerClick = function (stats) {
    this.#onionPerClick.textContent = stats.clickStr;
  };

  updatePerSecond = function (stats) {
    this.#onionPerSecond.textContent = stats.onionsPerSec;
  };

  updateTotalOnions = function (stats) {
    this.#totalOnionsStat.textContent = stats.totalOnions;
  };

  updateTotClicks = function (stats) {
    this.#totalClicksStat.textContent = stats.numClicks;
  };

  updateOnions = function (stats) {
    this.#count.textContent = stats.onions;
    this.updateTotalOnions(stats);
  };

  updateAll = function (stats) {
    this.updateOnions(stats);
    this.updateTotClicks(stats);
    this.updateTotalOnions(stats);
    this.updatePerSecond(stats);
    this.updatePerClick(stats);
  };

  addHandlerChop(handler) {
    this.#btnChop.addEventListener("click", handler);
  }
}

export default new StatsView();

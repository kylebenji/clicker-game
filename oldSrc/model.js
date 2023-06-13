import * as data from "./data.json";

// export let stats = {
//   onions: 0,
//   totalOnions: 0,
//   onionsPerSec: 0,
//   clickStr: 1,
//   numClicks: 0,
//   lastSaveTime: new Date().getTime(),
// };

// export let state = data;

// export const saveLocalStorage = function () {
//   stats.lastSaveTime = new Date().getTime();
//   localStorage.setItem("clickerStats", JSON.stringify(stats));
//   localStorage.setItem("clickerData", JSON.stringify(state));
// };

export const calculateOfflineOnions = function () {
  return (
    Math.floor((new Date().getTime() - stats.lastSaveTime) / 1000) *
    stats.onionsPerSec
  );
};

// export const loadLocalStorage = function () {
//   statsLocal = JSON.parse(localStorage.getItem("clickerStats"));
//   if (statsLocal) {
//     stats = statsLocal;
//   }
//   dataLocal = JSON.parse(localStorage.getItem("clickerData"));
//   if (dataLocal) {
//     state = dataLocal;
//   }
// };

// export const canAfford = function (price) {
//   return price < stats.onions;
// };

// export const addOnions = function (num) {
//   stats.onions += num;
//   stats.totalOnions += num;
// };

// export const click = function () {
//   stats.numClicks += 1;
// };

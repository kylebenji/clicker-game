import { useDispatch, useSelector } from "react-redux";
import { changeView, selectUpgradePane } from "../store/viewSlice";
import { buyUpgrade, selectUpgrades } from "../store/upgradesSlice";
import * as helpers from "../helpers";
import {
  addClickStr,
  addOnionsPerSec,
  decrementOnions,
  selectOnions,
} from "../store/statsSlice";

function UpgradeNav({ view }) {
  const dispatch = useDispatch();

  const buttons = [
    ["click-strength", "Clicks"],
    ["autoclick", "Autoclick"],
    ["autoclick-upgrades", "Autoclick Upgrades"],
    ["managers", "Managers"],
  ];

  function handleBtnClick(event) {
    dispatch(changeView({ upgradePane: event.target.dataset.type }));
  }

  return (
    <nav id="upgrade-select">
      {buttons.map((btn, i) => {
        return (
          <button
            id={btn[0] + "-btn"}
            className={
              view === btn[0] ? "upgrade-tab-btn selected" : "upgrade-tab-btn"
            }
            data-pane={i}
            data-type={btn[0]}
            key={btn[0] + "-btn"}
            onClick={handleBtnClick}
          >
            {btn[1]}
          </button>
        );
      })}
    </nav>
  );
}

function UpgradeBody({ view }) {
  const upgrades = useSelector(selectUpgrades);
  const onions = useSelector(selectOnions);
  const dispatch = useDispatch();

  function handleBuyUpgrade(upgradeType, upgradeName) {
    const upgrade = upgrades[upgradeType][upgradeName];

    if (upgradeType === "manager" && upgrade.owned) return false;
    if (onions < upgrade.cost) return false;

    dispatch(decrementOnions({ onions: upgrade.cost }));
    dispatch(buyUpgrade({ upgradeType, upgradeName }));

    switch (upgradeType) {
      case "click-strength":
        dispatch(addClickStr({ clickStrIncrease: upgrade.clickIncrease }));
        break;
      case "autoclick":
        dispatch(addOnionsPerSec({ perSecIncrease: upgrade.perSecIncrease }));
        break;
      case "autoclick-upgrades":
        break;
      case "manager":
        break;
      default:
        break;
    }
  }

  function handleBuyUpgradeClick(event) {
    const target = event.target;
    const upgradeEl = target.closest(".upgrade");
    handleBuyUpgrade(upgradeEl.dataset.type, upgradeEl.id);
  }

  return Object.entries(upgrades).map((upgradeType, i) => {
    return (
      <table
        id={upgradeType[0]}
        className={`${
          upgradeType[0] === view ? "" : "hidden"
        } upgrades-pane upgrades-pane--${i}`}
        key={upgradeType[0]}
      >
        <thead>
          <tr className="manager upgrade">
            <th scope="col" className="header_title">
              Upgrade
            </th>
            <th scope="col" className="header_description">
              Description
            </th>
            {upgradeType[0] === "managers" ? (
              <th scope="col" className="header_owned">
                Owned?
              </th>
            ) : (
              <th scope="col" className="header_count">
                Count
              </th>
            )}
            <th scope="col" className="header_cost">
              Cost
            </th>
            <th scope="col" className="header_buy"></th>
            {upgradeType[0] === "managers" ? (
              <th scope="col" className="header_active">
                Active?
              </th>
            ) : (
              []
            )}
          </tr>
        </thead>
        <tbody>
          {Object.entries(upgradeType[1]).map((upgrade) => {
            return (
              <tr
                className={`${upgradeType[0]} upgrade`}
                id={upgrade[0]}
                key={upgrade[0]}
                data-type={upgradeType[0]}
              >
                <th scope="row" className="upg-name">
                  {upgrade[1].name}
                </th>
                <td>{upgrade[1].description}</td>
                {upgradeType[0] === "managers" ? (
                  <td className="owned">{upgrade[1].owned ? "Yes" : "No"}</td>
                ) : (
                  <td className="count">{upgrade[1].count}</td>
                )}
                <td className="cost">{helpers.displayNum(upgrade[1].cost)}</td>
                <td>
                  <button className="buy" onClick={handleBuyUpgradeClick}>
                    Buy
                  </button>
                </td>
                {upgradeType[0] === "managers" ? (
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="toggleOnOff"
                        disabled="disabled"
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                ) : (
                  []
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  });
}

export default function Upgrades() {
  const view = useSelector(selectUpgradePane);

  return (
    <div className="upgrades left col-sm-5">
      <h2>Upgrades</h2>
      <UpgradeNav view={view} />
      <UpgradeBody view={view} />
    </div>
  );
}

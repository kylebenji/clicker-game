import { useDispatch, useSelector } from "react-redux";
import { changeView, selectUpgradePane } from "../store/viewSlice";
import { selectUpgrades, toggleManager } from "../store/upgradesSlice";
import * as helpers from "../helpers";

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
      <div className="btn-group" role="group">
        {buttons.map((btn, i) => {
          return (
            <button
              id={btn[0] + "-btn"}
              className={
                view === btn[0]
                  ? "upgrade-tab-btn active btn btn-secondary"
                  : "upgrade-tab-btn btn btn-secondary"
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
      </div>
    </nav>
  );
}

function UpgradeBody({ view }) {
  const upgrades = useSelector(selectUpgrades);
  const dispatch = useDispatch();

  function handleBuyUpgradeClick(event) {
    const target = event.target;
    const upgradeEl = target.closest(".upgrade");
    helpers.handleBuyUpgrade(upgradeEl.dataset.type, upgradeEl.id);
  }

  function handleToggleManager(event) {
    const upgradeEl = event.target.closest(".upgrade");
    dispatch(toggleManager({ manager: upgradeEl.id }));
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
            <th scope="col" className="upg-name">
              Upgrade
            </th>
            <th scope="col" className="upg-description">
              Description
            </th>
            {upgradeType[0] === "managers" ? (
              <th scope="col" className="upg-owned">
                Owned?
              </th>
            ) : (
              <th scope="col" className="upg-count">
                Count
              </th>
            )}
            <th scope="col" className="upg-cost">
              Cost
            </th>
            <th scope="col" className="upg-buy"></th>
            {upgradeType[0] === "managers" ? (
              <th scope="col" className="upg-active">
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
                {upgradeType[0] === "click-strength" ? (
                  <td className="upg-description">
                    {upgrade[1].description.replace(
                      "%VALUE%",
                      upgrade[1].clickIncrease
                    )}
                  </td>
                ) : upgradeType[0] === "autoclick" ? (
                  <td className="upg-description">
                    {upgrade[1].description.replace(
                      "%VALUE%",
                      upgrade[1].perSecIncrease
                    )}
                  </td>
                ) : upgradeType[0] === "autoclick-upgrades" ? (
                  <td className="upg-description">
                    {upgrade[1].description.replace(
                      "%VALUE%",
                      upgrade[1].increase
                    )}
                  </td>
                ) : (
                  <td className="upg-description">{upgrade[1].description}</td>
                )}

                {upgradeType[0] === "managers" ? (
                  <td className="upg-owned">
                    {upgrade[1].owned ? "Yes" : "No"}
                  </td>
                ) : (
                  <td className="upg-count">{upgrade[1].count}</td>
                )}
                <td className="upg-cost">
                  {helpers.displayNum(upgrade[1].cost)}
                </td>
                <td className="upg-buy">
                  <button
                    className="buy btn btn-secondary"
                    onClick={handleBuyUpgradeClick}
                    disabled={
                      upgradeType[0] === "managers" && upgrade[1].owned
                        ? true
                        : false
                    }
                  >
                    Buy
                  </button>
                </td>
                {upgradeType[0] === "managers" ? (
                  <td className="upg-active">
                    <label className="switch">
                      <input
                        onChange={handleToggleManager}
                        type="checkbox"
                        className="toggleOnOff"
                        checked={upgrade[1].on}
                        disabled={!upgrade[1].owned}
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

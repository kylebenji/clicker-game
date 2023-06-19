/* to include:
Dark Mode
toggle all managers
achievements
etc.
*/

import { useDispatch } from "react-redux";
import { toggleAllManagers } from "../store/upgradesSlice";

export default function Menu() {
  const dispatch = useDispatch();

  function allManagersOn() {
    dispatch(toggleAllManagers({ managersOn: true }));
  }
  function allManagersOff() {
    dispatch(toggleAllManagers({ managersOn: false }));
  }

  return (
    <div id="menu" className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-toggle="dropdown"
      >
        Menu
      </button>
      <div className="dropdown-menu">
        <button onClick={allManagersOn} className="dropdown-item" type="button">
          All Managers On (WIP)
        </button>
        <button
          onClick={allManagersOff}
          className="dropdown-item"
          type="button"
        >
          All Managers Off (WIP)
        </button>
        <button className="dropdown-item" type="button">
          Settings (WIP)
        </button>
        <button className="dropdown-item" type="button">
          Achievements (WIP)
        </button>
      </div>
    </div>
  );
}

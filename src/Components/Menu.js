/* to include:
Dark Mode
toggle all managers
achievements
etc.
*/

export default function Menu() {
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
        <button className="dropdown-item" type="button">
          All Managers On (WIP)
        </button>
        <button className="dropdown-item" type="button">
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

export function Toggle({ toggleHandler, checked, disabled }) {
  return (
    <label className="switch">
      <input
        onChange={toggleHandler}
        type="checkbox"
        className="toggleOnOff"
        checked={checked}
        disabled={disabled}
      />
      <span className="slider"></span>
    </label>
  );
}

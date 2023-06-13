import { useDispatch, useSelector } from "react-redux";
import { addClick, addOnions, selectStats } from "../store/statsSlice";

export default function Data() {
  const dispatch = useDispatch();
  const stats = useSelector(selectStats);

  function click() {
    dispatch(addClick());
    dispatch(
      addOnions({
        onions: stats.clickStr,
      })
    );
  }

  return (
    <div className="right col-sm-5">
      <h2 id="onions-chopped">Onions Chopped:</h2>
      <h2 id="count">{stats.onions}</h2>
      <button id="onions" onClick={click}>
        Chop Onion
      </button>
      <div id="stats">
        <p>
          Onions per click: <span id="onion-per-click">{stats.clickStr}</span>
        </p>
        <p>
          Auto onions per second:{" "}
          <span id="auto-onion-per-second">{stats.onionsPerSec}</span>
        </p>
        <p>
          Total onions chopped:{" "}
          <span id="total-onions">{stats.totalOnions}</span>
        </p>
        <p>
          Total clicks: <span id="total-clicks">{stats.numClicks}</span>
        </p>
      </div>
    </div>
  );
}

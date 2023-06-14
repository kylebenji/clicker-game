import { useDispatch, useSelector } from "react-redux";
import { addClick, addOnions, selectStats } from "../store/statsSlice";

export default function Data() {
  const dispatch = useDispatch();
  const stats = useSelector(selectStats);

  const format = new Intl.NumberFormat("en-US");

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
      <h2 id="count">{format.format(stats.onions)}</h2>
      <button id="onions" onClick={click}>
        Chop Onion
      </button>
      <div id="stats">
        <p>
          Onions per click:{" "}
          <span id="onion-per-click">{format.format(stats.clickStr)}</span>
        </p>
        <p>
          Auto onions per second:{" "}
          <span id="auto-onion-per-second">
            {format.format(stats.onionsPerSec)}
          </span>
        </p>
        <p>
          Total onions per second:{" "}
          <span id="total-onions-per-second">
            {format.format(stats.totalOnionsPerSec)}
          </span>
        </p>
        <p>
          Max onions per second:{" "}
          <span id="max-onions-per-second">
            {format.format(stats.maxOnionsPerSec)}
          </span>
        </p>
        <p>
          Total onions chopped:{" "}
          <span id="total-onions">{format.format(stats.totalOnions)}</span>
        </p>
        <p>
          Total clicks:{" "}
          <span id="total-clicks">{format.format(stats.numClicks)}</span>
        </p>
      </div>
    </div>
  );
}

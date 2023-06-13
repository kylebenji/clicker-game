export default function Data() {
  return (
    <div class="right col-sm-5">
      <h2 id="onions-chopped">Onions Chopped:</h2>
      <h2 id="count">0</h2>
      <button id="onions">Chop Onion</button>
      <div id="stats">
        <p>
          Onions per click: <span id="onion-per-click">1</span>
        </p>
        <p>
          Auto onions per second: <span id="auto-onion-per-second">0</span>
        </p>
        <p>
          Total onions chopped: <span id="total-onions">0</span>
        </p>
        <p>
          Total clicks: <span id="total-clicks">0</span>
        </p>
      </div>
    </div>
  );
}

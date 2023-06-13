import Data from "./Data";
import Upgrades from "./Upgrades";

export default function ClickerGame() {
  return (
    <>
      <h1 id="title">Prep Cook Clicker</h1>
      <div className="game">
        <Upgrades />
        <Data />
      </div>
    </>
  );
}

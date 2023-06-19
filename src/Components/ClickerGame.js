import Data from "./Data";
import Menu from "./Menu";
import Upgrades from "./Upgrades";

export default function ClickerGame() {
  return (
    <>
      <h1 id="title">Prep Cook Clicker</h1>
      <Menu />
      <div className="game">
        <Upgrades />
        <Data />
      </div>
    </>
  );
}

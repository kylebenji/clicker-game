function UpgradeNav() {
  return (
    <nav id="upgrade-select">
      <button
        id="click-upgrades"
        class="selected upgrade-tab-btn"
        data-pane="1"
      >
        Clicks
      </button>
      <button id="autoclick-purchases" class="upgrade-tab-btn" data-pane="2">
        Autoclick
      </button>
      <button id="autoclick-upgrades" class="upgrade-tab-btn" data-pane="3">
        Autoclick Upgrades
      </button>
      <button id="managers-btn" class="upgrade-tab-btn" data-pane="4">
        Managers
      </button>
    </nav>
  );
}

function ClickStrengthUpgrades() {
  return (
    <table id="click-strength" class="upgrades-pane upgrades-pane--1">
      <thead>
        <tr class="click-strength-upgrade upgrade">
          <th scope="col" class="header_title">
            Upgrade
          </th>
          <th scope="col" class="header_description">
            Description
          </th>
          <th scope="col" class="header_count">
            Count
          </th>
          <th scope="col" class="header_cost">
            Cost
          </th>
          <th scope="col" class="header_buy"></th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}

function Autoclickers() {
  return (
    <table id="autoclick" class="hidden upgrades-pane upgrades-pane--2">
      <thead>
        <tr class="autoclicker upgrade">
          <th scope="col" class="header_title">
            Upgrade
          </th>
          <th scope="col" class="header_description">
            Description
          </th>
          <th scope="col" class="header_count">
            Count
          </th>
          <th scope="col" class="header_cost">
            Cost
          </th>
          <th scope="col" class="header_buy"></th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}

function AutoclickUpgrades() {
  return (
    <table id="auto-up" class="hidden upgrades-pane upgrades-pane--3">
      <thead>
        <tr class="autoclickUp upgrade">
          <th scope="col" class="header_title">
            Upgrade
          </th>
          <th scope="col" class="header_description">
            Description
          </th>
          <th scope="col" class="header_count">
            Count
          </th>
          <th scope="col" class="header_cost">
            Cost
          </th>
          <th scope="col" class="header_buy"></th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}

function Managers() {
  return (
    <table id="managers" class="hidden upgrades-pane upgrades-pane--4">
      <thead>
        <tr class="manager upgrade">
          <th scope="col" class="header_title">
            Upgrade
          </th>
          <th scope="col" class="header_description">
            Description
          </th>
          <th scope="col" class="header_owned">
            Owned?
          </th>
          <th scope="col" class="header_cost">
            Cost
          </th>
          <th scope="col" class="header_buy"></th>
          <th scope="col" class="header_active">
            Active?
          </th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}

export default function Upgrades() {
  return (
    <div class="upgrades left col-sm-5">
      <h2>Upgrades</h2>
      <UpgradeNav />
      <ClickStrengthUpgrades />
      <Autoclickers />
      <AutoclickUpgrades />
      <Managers />
    </div>
  );
}

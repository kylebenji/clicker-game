/* to include:
Dark Mode
achievements
etc.
*/

import { useDispatch, useSelector } from "react-redux";
import { toggleAllManagers } from "../store/upgradesSlice";
import { Button, Dropdown, Modal } from "react-bootstrap";
import {
  selectShowSettings,
  selectTheme,
  setShowSettings,
  setTheme,
} from "../store/viewSlice";
import { Toggle } from "./General";

export default function Menu() {
  const dispatch = useDispatch();

  function allManagersOn() {
    dispatch(toggleAllManagers({ managersOn: true }));
  }

  function allManagersOff() {
    dispatch(toggleAllManagers({ managersOn: false }));
  }

  function handleShowSettings() {
    dispatch(setShowSettings({ showSettings: true }));
  }

  return (
    <Dropdown id="menu">
      <Dropdown.Toggle variant="secondary">Menu</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={allManagersOn}>All Managers On</Dropdown.Item>
        <Dropdown.Item onClick={allManagersOff}>All Managers Off</Dropdown.Item>
        <Dropdown.Item onClick={handleShowSettings}>Settings</Dropdown.Item>
        <Dropdown.Item>Achievements</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

//settings modal
export function Settings() {
  const showSettings = useSelector(selectShowSettings);
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(setShowSettings({ showSettings: false }));
  }

  function toggleDarkMode() {
    const currTheme = document.querySelector("html").dataset.bsTheme;
    if (currTheme === "dark") {
      document.querySelector("html").dataset.bsTheme = "light";
    }
    if (currTheme === "light") {
      document.querySelector("html").dataset.bsTheme = "dark";
    }
    dispatch(
      setTheme({ theme: document.querySelector("html").dataset.bsTheme })
    );
  }

  return (
    <Modal show={showSettings} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Dark Mode{" "}
          <Toggle
            toggleHandler={toggleDarkMode}
            checked={useSelector(selectTheme) === "dark"}
          ></Toggle>
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

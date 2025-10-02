import styles from "./Home.module.css";
import { useState, useReducer } from "react";
import IncidentList from "./IncidentList.jsx";
import Welcome from "./Welcome.jsx";
import data from "./incidents.json";

function incidentsReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((i) => i.incident_id !== action.payload);
    default:
      return state;
  }
}

function Home() {
  const object = {
    prefix: "Mr.",
    firstName: "Mohan Chowdary",
    lastName: "Muppala",
    time: "2025-09-30",
  };

  const [homePageView, setHomePageView] = useState(false);
  const [incidentPageView, setIncidentPageView] = useState(false);

  const [darkMode, setDarkMode] = useState(false); // 🌙 track dark mode
  const [incidents, dispatch] = useReducer(incidentsReducer, data);

  function handleHomePageView() {
    setHomePageView(true);
    setIncidentPageView(false);
  }

  function handleIncidentPageView() {
    setHomePageView(false);
    setIncidentPageView(true);
  }

  function handleDelete(id) {
    dispatch({ type: "delete", payload: id });
  }

  function handleAdd(newIncident) {
    dispatch({ type: "add", payload: newIncident });
  }

  // ✅ Define toggleDarkmode
  function toggleDarkmode() {
    setDarkMode((prev) => !prev);
  }

  return (
    <div className={darkMode ? styles.dark : styles.light}>
      <header className={styles.header}>
        <h1>
          Welcome! {object.prefix}
          {object.firstName}
          {object.lastName}! Time since Last Incident {object.time}
        </h1>
        <ul className={styles.list}>
          <li>
            <a href="#" onClick={handleHomePageView}>
              Home
            </a>
          </li>
          <li>
            <a href="#" onClick={handleIncidentPageView}>
              Incident
            </a>
          </li>
        </ul>
        <button onClick={toggleDarkmode}>Toggle DarkMode</button>
      </header>

      {(!homePageView && incidentPageView) ? (
        <IncidentList
          incidents={incidents}
          handleDelete={handleDelete}
          onAdd={handleAdd}
        />
      ) : (
        <Welcome />
      )}
    </div>
  );
}

export default Home;

import styles from "./Home.module.css";
import { useState, useReducer } from "react";
import IncidentList from "./IncidentList.jsx";
import Welcome from "./Welcome.jsx";
import data from "./incidents.json";

import { Link ,Route ,Routes } from "react-router-dom";

function incidentsReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((i) => i.incident_id !== action.payload);
    case "update":
      return action.payload;
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

  const [darkMode, setDarkMode] = useState(false); 
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

  function handleUpdate(updatedList) {
    dispatch({ type: "update", payload: updatedList });
  }

  
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
            <Link to='/' onClick={handleHomePageView}>
              Home
            </Link>
          </li>
          <li>
            <Link to='/incidents' onClick={handleIncidentPageView}>
              Incident
            </Link>
          </li>
        </ul>
        <button onClick={toggleDarkmode}>Toggle DarkMode</button>
      </header>

      <Routes>

      <Route path="/" element={homePageView ? <Welcome /> : null} />
  <Route path="/incidents" element={incidentPageView ? <IncidentList incidents={incidents} onAdd={handleAdd} handleDelete={handleDelete} onUpdate={handleUpdate} /> : null} />
      </Routes>
    </div>
  );
}

export default Home;

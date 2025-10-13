import Incident from "./Incident.jsx";
import { useContext, useState } from "react";
import styles from "./Incident.module.css";
import { ThemeContext } from "./ThemeContext.js";

function IncidentList({ incidents, handleDelete, onAdd, onUpdate }) {
  const [form, setForm] = useState({
    incident_id: "",
    priority: "low",
    severity: "4",
    status: "low",
  });

  const theme = useContext(ThemeContext);
  const IncidentListClass = `${styles.IncidentList} ${
    theme === "dark" ? styles.dark : ""
  }`;

  
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

 
  function handleSubmit(e) {
    e.preventDefault();

    if (!form.incident_id.trim()) {
      alert("Please enter an Incident ID");
      return;
    }

    const newIncident = {
      incident_id: form.incident_id,
      priority: form.priority,
      severity: form.severity,
      status: form.status,
    };

    onAdd(newIncident); 

    setForm({
      incident_id: "",
      priority: "low",
      severity: "4",
      status: "low",
    });
  }


  function handleUpdate(id, updatedIncident) {
    
    const updatedList = incidents.map((incident) =>
      incident.incident_id === id
        ? { ...incident, ...updatedIncident }
        : incident
    );

    
    if (onUpdate) {
      onUpdate(updatedList);
    }
  }

  return (
    <>
      <main>
        <form className={styles.form} onSubmit={handleSubmit}>
          <span>
            <label htmlFor="inc-id">Incident ID</label>
            <input
              type="text"
              name="incident_id"
              placeholder="INC-0000"
              id="inc-id"
              value={form.incident_id}
              onChange={handleChange}
            />
          </span>

          <span>
            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              id="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </span>

          <span>
            <label htmlFor="severity">Severity</label>
            <select
              name="severity"
              id="severity"
              value={form.severity}
              onChange={handleChange}
            >
              <option value="1">1-Low</option>
              <option value="2">2-Medium</option>
              <option value="3">3-High</option>
              <option value="4">4-Critical</option>
            </select>
          </span>

          <span>
            <label htmlFor="status">Status</label>
            <select
              name="status"
              id="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </span>

          <button type="submit" className={styles.btn}>
            Save
          </button>
        </form>
      </main>

      <div className={styles.box}>
        {incidents.length > 0 ? (
          incidents.map((incident) => (
            <Incident
              key={incident.incident_id}
              incident={incident}
              handleClick={() => handleDelete(incident.incident_id)}
              handleUpdate={handleUpdate}
            />
          ))
        ) : (
          <p>No incidents available</p>
        )}
      </div>
    </>
  );
}

export default IncidentList;

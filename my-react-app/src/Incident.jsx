import { useState } from "react";
import styles from "./Incident.module.css";
import { Button, TextField, Select, MenuItem } from "@mui/material";

function Incident({ incident, handleClick, handleUpdate }) {
  const { incident_id, status, priority, severity } = incident;

  const [isEditing, setIsEditing] = useState(false);
  const [editedIncident, setEditedIncident] = useState({
    incident_id,
    status,
    priority,
    severity,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedIncident((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    handleUpdate(incident_id, editedIncident);
    setIsEditing(false);
  };

  
  const severityLabel = (val) => {
    switch (val) {
      case "1": return "1-Low";
      case "2": return "2-Medium";
      case "3": return "3-High";
      case "4": return "4-Critical";
      default: return val;
    }
  };

  return (
    <div className={styles.div}>
      {isEditing ? (
        <>
          <TextField
            label="ID"
            name="incident_id"
            value={editedIncident.incident_id}
            onChange={handleChange}
            size="small"
            fullWidth
          />

          <Select
            name="status"
            value={editedIncident.status}
            onChange={handleChange}
            size="small"
            fullWidth
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
          </Select>

          <Select
            name="priority"
            value={editedIncident.priority}
            onChange={handleChange}
            size="small"
            fullWidth
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
          </Select>

          <Select
            name="severity"
            value={editedIncident.severity}
            onChange={handleChange}
            size="small"
            fullWidth
          >
            <MenuItem value="1">1-Low</MenuItem>
            <MenuItem value="2">2-Medium</MenuItem>
            <MenuItem value="3">3-High</MenuItem>
            <MenuItem value="4">4-Critical</MenuItem>
          </Select>

          <div className={styles.buttonRow}>
            <Button variant="contained" color="success" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <p><b>ID:</b> {incident_id}</p>
          <p><b>Status:</b> {status}</p>
          <p><b>Priority:</b> {priority}</p>
          <p><b>Severity:</b> {severityLabel(severity)}</p>

          <div className={styles.buttonRow}>
            <Button variant="contained" color="error" onClick={handleClick}>
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Incident;

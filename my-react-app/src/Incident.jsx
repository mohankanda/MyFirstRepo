import styles from "./Incident.module.css";

import { Button } from "@mui/material";

function Incident({ incident, handleClick }) {
  const { incident_id, status, priority, severity } = incident;

  return (
    <div className={styles.div}>
      <p><b>ID:</b> {incident_id}</p>
      <p><b>Status:</b> {status}</p>
      <p><b>Priority:</b> {priority}</p>
      <p><b>Severity:</b> {severity}</p>
      
      <Button 
        
        color="error"
        variant="contained"

        onClick={handleClick} 
        
      >
        Delete
      </Button>
    </div>
  );
}

export default Incident;

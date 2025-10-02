import styles from "./Incident.module.css";

function Incident({ incident, handleClick }) {
  const { incident_id, status, priority, severity } = incident;

  return (
    <div className={styles.div}>
      <p><b>ID:</b> {incident_id}</p>
      <p><b>Status:</b> {status}</p>
      <p><b>Priority:</b> {priority}</p>
      <p><b>Severity:</b> {severity}</p>
      
      <button 
        type="button" 
        onClick={handleClick} 
        className={styles.btn}
      >
        Delete
      </button>
    </div>
  );
}

export default Incident;

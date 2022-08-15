import React from "react";
import styles from "../../styles/Research.module.css";

export default function Contribute() {
  return (
    <>
      <>
        <div className={styles.contribute}>
          <h3>Support DAO for Grants</h3>
          <input
            placeholder="Enter Amount to Contribute"
            className={styles.amount}
            type="number"
          />
          <button className={styles.button}>Contribute</button>
        </div>
      </>
    </>
  );
}

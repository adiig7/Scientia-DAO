import React from "react";
import DashboardTabs from "../src/components/DashboardTabs";
import styles from "../styles/Dashboard.module.css";

export default function dashboard() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word2}`}>Member </span>
          <span className={`${styles.titleWord} ${styles.word1}`}>Dashboard</span>
        </div>
        <DashboardTabs />
      </main>
    </>
  );
}

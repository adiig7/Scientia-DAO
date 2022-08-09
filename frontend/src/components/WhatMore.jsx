import React from "react";
import styles from "../../styles/Home.module.css";

export default function WhatMore() {
  return (
    <>
      <div className={styles.what_more}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word2}`}>What </span>
          <span className={`${styles.titleWord} ${styles.word1}`}>More</span>
          <span className={`${styles.titleWord} ${styles.word2}`}> to</span>
          <span className={`${styles.titleWord} ${styles.word1}`}>
            {" "}
            Expect ?
          </span>
        </div>
        <div className={styles.upcoming}>
          <p>
            We have planned to add more feature to <b>Scientia DAO</b> in future
            and will be working on implementing those as we move forward with the project.
            To give you all a glimpse of of what we are planning, here are the few things that we
            will be working on to improve this project:
          </p>

            <li>🚀 Colloborate &#38; Contribute feature for DAO Members</li> 
            <li>🚀 Milestone feature for Grants</li> 
            <li>🚀 Token and Governance Setup</li> 
            <li>🚀 License and Patent feature for published researches</li> 
        </div>
      </div>
    </>
  );
}

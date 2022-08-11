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
            We have planned to add more features to <b>Scientia DAO</b> in the future
            and will be working on implementing those as we move forward with the project.
            To give you all a glimpse of what we are planning, here are a few things that we
            will be working on to improve this project:
          </p>

            <li>🚀 Collaborate &#38; contribute feature for DAO Members</li> 
            <li>🚀 Milestone feature for grants</li> 
            <li>🚀 Token and governance setup</li> 
            <li>🚀 License and patent feature for published researches</li> 
        </div>
      </div>
    </>
  );
}

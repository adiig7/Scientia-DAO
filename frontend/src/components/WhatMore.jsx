import React from "react";
import styles from "../../styles/Home.module.css";

export default function WhatMore() {
  return (
    <>
      <div className={styles.what_more}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word2}`}>What</span>
          <span className={`${styles.titleWord} ${styles.word1}`}> More</span>
          <span className={`${styles.titleWord} ${styles.word2}`}> to</span>
          <span className={`${styles.titleWord} ${styles.word1}`}>
            {" "}
            Expect ?
          </span>
        </div>

        <div className={styles.upcoming}>
          <p>
            We have a lot of things planned for this project and will be working
            on them one by one. Here are some key points to give ya&#39;ll a
            glimpse of what we are planning to implement in future:
            <br />
            <br />
            <span>
            🚀 Milestone feature for grants
            <br />
            <br />
            🚀 Token &#38; Governance launch
            <br />
            <br />
            🚀 Liscensing &#38; Patent feature for researches
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

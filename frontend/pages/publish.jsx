import React from "react";
import styles from "../styles/Publish.module.css";

export default function () {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word2}`}>
            Publish{" "}
          </span>
          <span className={`${styles.titleWord} ${styles.word1}`}>Research</span>
        </div>

        <div className={styles.publish}>
          <p>Kushagra Kushagra Kushagra Kushagra Kushagra</p>

          <p>Kushagra Kushagra Kushagra Kushagra Kushagra</p>
        </div>
      </main>
    </>
  );
}

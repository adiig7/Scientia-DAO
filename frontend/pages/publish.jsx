import React, { useState } from "react";
import styles from "../styles/Publish.module.css";

export default function () {
  // const [file, setFile] = useState([]);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word2}`}>
            Publish{" "}
          </span>
          <span className={`${styles.titleWord} ${styles.word1}`}>
            Research
          </span>
        </div>

        <div className={styles.publish}>
          Enter Research Title
          <input className={styles.research_title} type="text" placeholder="Research Title Here" />
          Enter Research Description <small className={styles.small}> &#40; Minimum 500 words &#41;</small>
          <textarea className={styles.research_desc}
            name=""
            id=""
            placeholder="Enter Research Details Here"
          ></textarea>
          Select Research Media Files
          <input className={styles.research_docs} type="file" multiple/>
          <button className={styles.button}> Upload Research to IPFS </button>
         
          
        </div>
      </main>
    </>
  );
}

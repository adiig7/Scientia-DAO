import React from 'react'
import styles from "../../styles/Member.module.css";

export default function GrantsProposal() {
  return (
    <main className={styles.main}>
        <div className={styles.idea}>
          Enter Research Idea 
          <input
            className={styles.research_title}
            type="text"
            placeholder="Research Idea Here"
          />
          <label htmlFor="">Describe your Idea</label>
          <small className={styles.small}> &#40; minimum 200 words &#41;</small>
          <textarea
            className={styles.research_desc}
            name=""
            id=""
            placeholder="Describe the research idea "
          ></textarea>
          Upload any media files  
          <input className={styles.research_docs} type="file" multiple />
          <div className={styles.center}>
            <button className={styles.button}>Submit Proposal </button>
          </div>
        </div>
    </main>
  )
}

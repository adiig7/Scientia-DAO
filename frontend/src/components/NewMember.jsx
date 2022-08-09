import React from "react";
import styles from "../../styles/Member.module.css";

export default function NewMember() {
  return (
    <>
      <div className={styles.newMember}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word2}`}>Create</span>
          <span className={`${styles.titleWord} ${styles.word1}`}> DAO</span>
          <span className={`${styles.titleWord} ${styles.word2}`}> Entry</span>
          <span className={`${styles.titleWord} ${styles.word1}`}>
            {" "}
            Proposal
          </span>
        </div>
        <label>Enter Your Name</label>
        <input placeholder="Name" className={styles.member_name} type="text" />
        <label>Describe Yourself <small> &#40; minimum 150 words &#41; </small></label>
        <textarea placeholder="Bio" className={styles.member_bio} type="text" />
        <label>Field of Research <small> &#40; optional &#41; </small> </label>
        <input placeholder="Research Field" className={styles.member_name} type="text" />
        
        <div className={styles.center}>
          <button className={styles.button}>Submit Proposal</button>
        </div>
      </div>
    </>
  );
}

import React from "react";
import styles from "../../styles/Member.module.css";

export default function NewMember() {
  return (
    <>
      <div className={styles.newMember}>
        <h3>Enter Details Below to Create Entry Proposal</h3>
        <label>Name</label>
        <input  className={styles.member_name} type="text" />
        <label>Bio</label>
        <textarea className={styles.member_bio}  type="text" />
      </div>
    </>
  );
}

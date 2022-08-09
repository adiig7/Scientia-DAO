import React from "react";
import styles from '../../styles/Member.module.css'

export default function MemberCard( props ) {
  return (
    <>
      <main className={styles.proposalCard}>
        <div>
          <h3>{ props.member_name }</h3>
          <p>{ props.member_bio }</p>
          <b> <u> Field of Expertise</u></b>
          <h3>{ props.member_field }</h3>
          <div className={styles.vote}>
            <button className={`${styles.button} ${styles.width}`}>Approve</button>
            <button className={`${styles.button} ${styles.width}`}>Deny</button>
          </div>
        </div>
      </main>
    </>
  );
}

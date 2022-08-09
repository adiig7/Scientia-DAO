import React from 'react'
import MemberCard from './MemberCard'
import styles from '../../styles/Member.module.css'


export default function ApproveEntry() {
  return (
    <main>
      <div>
        <MemberCard />
      </div>
      <div className={styles.vote}>   
        <button className={styles.button}>Approve</button>
        <button className={styles.button}>Deny</button>
      </div>
    </main>
  )
}

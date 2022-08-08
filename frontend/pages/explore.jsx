import React from 'react'
import ResearchCard from '../src/components/ResearchCard'
import styles from '../styles/Explore.module.css'

export default function explore() {
  return (
    <div className={styles.main}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word1}`}>
            Published{" "}
          </span>
          <span className={`${styles.titleWord} ${styles.word2}`}>
            Researches
          </span>
        </div>
        <div className={styles.researches}>
            <ResearchCard />
            <ResearchCard />
            <ResearchCard />
        </div>
    </div>
  )
}

import React from "react";
import ResearchCard from "../src/components/ResearchCard";
import styles from "../styles/Explore.module.css";
import Head from "next/head";

export default function explore() {
  return (
    <>
      <Head>
        <title>Explore</title>
        <meta
          name="description"
          content="PUBLISH and SHARE YOUR RESEARCH ON THE WORLD'S FIRST DAO COMMUNITY FOR SCIENTISTS"
        />
        <link rel="icon" href="/microscope.png" />
      </Head>

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
    </>
  );
}

import React from "react";
import DashboardTabs from "../src/components/DashboardTabs";
import styles from "../styles/Dashboard.module.css";
import Head from "next/head";

export default function dashboard() {
  return (
    <>
    <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="PUBLISH and SHARE YOUR RESEARCH ON THE WORLD'S FIRST DAO COMMUNITY FOR SCIENTISTS"
        />
        <link rel="icon" href="/microscope.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word2}`}>Member </span>
          <span className={`${styles.titleWord} ${styles.word1}`}>Dashboard</span>
        </div>
        <DashboardTabs />
      </main>
    </>
  );
}

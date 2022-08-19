import React from "react";
import styles from "../styles/Team.module.css";
import Image from "next/image";
import Head from "next/head";
import nils_giebing from "../src/assets/nils_giebing.jpg";
import kushagra_sarathe from "../src/assets/kushagra_sarathe.jpg";
import dhruv_agarwal from "../src/assets/dhruv_agarwal.jpg";
import aditya_gupta from "../src/assets/aditya_gupta.jpg";
import twitter from "../src/assets/twitter.png";
import github from "../src/assets/github.svg";

export default function team() {
  return (
    <>
      <Head>
        <title>Team</title>
        <meta
          name="description"
          content="PUBLISH and SHARE YOUR RESEARCH ON THE WORLD'S FIRST DAO COMMUNITY FOR SCIENTISTS"
        />
        <link rel="icon" href="/microscope.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word2}`}>Meet</span>
          <span className={`${styles.titleWord} ${styles.word1}`}> The </span>
          <span className={`${styles.titleWord} ${styles.word2}`}>
            Founders
          </span>
        </div>

        <div className={styles.founders}>
          <div className={styles.card}>
            <h2>Nils Giebing</h2>

            <Image src={nils_giebing} alt="Nils Giebing" />
            <p>
              <b>Backend Developer</b>
            </p>
            {/* <p>Loves to travel and contribute to communities.</p> */}
            <a
              href="https://twitter.com/NilsGiebing"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={twitter} alt="Twitter Logo" />
            </a>
            <a
              href="https://github.com/nilsgiebing"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={github} alt="Github Logo" />
            </a>
          </div>
          <div className={styles.card}>
            <h2>Kushagra Sarathe</h2>

            <Image src={kushagra_sarathe} alt="Nils Giebing" />
            <p>
              <b>Frontend Developer</b>
            </p>
            {/* <p>Bug bounty hunter turned Frontend developer</p> */}
            <a
              href="https://twitter.com/kushagrasarathe"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={twitter} alt="Twitter Logo" />
            </a>
            <a
              href="https://github.com/kushagrasarathe"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={github} alt="Github Logo" />
            </a>
          </div>
          <div className={styles.card}>
            <h2>Dhruv Agarwal</h2>

            <Image src={dhruv_agarwal} alt="Nils Giebing" />
            <p>
              <b>Fullstack Developer</b>
            </p>
            {/* <p>Fullstack developer building fun projects</p> */}
            <a
              href="https://twitter.com/0xdhruva"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={twitter} alt="Twitter Logo" />
            </a>
            <a
              href="https://github.com/Dhruv-2003"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={github} alt="Github Logo" />
            </a>
          </div>
          <div className={styles.card}>
            <h2>Aditya Gupta</h2>

            <Image src={aditya_gupta} alt="Nils Giebing" />
            <p>
              <b>Smart-contract Developer</b>
            </p>
            {/* <p> Smart-contract developer</p> */}
            <a
              href="https://twitter.com/adiig7"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={twitter} alt="Twitter Logo" />
            </a>
            <a
              href="https://github.com/adiig7"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={github} alt="Github Logo" />
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

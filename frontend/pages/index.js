import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import hero from "../src/assets/hero.png";
import JoinSection from "../src/components/JoinSection";
import FeaturesSection from "../src/components/FeaturesSection";
import WhatMore from "../src/components/WhatMore";

// import scientist from "../assets/scientist.png";
// import image8 from "../assets/8_bg.png";
// import grants from "../assets/grants.png";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Scientia DAO</title>
        <meta
          name="description"
          content="PUBLISH and SHARE YOUR RESEARCH ON THE WORLD'S FIRST DAO COMMUNITY FOR SCIENTISTS"
        />
        <link rel="icon" href="/microscope.png" />
      </Head>

      <main className={`${styles.main}`}>
        <div>
          <div className={styles.title}>
            <span className={`${styles.titleWord} ${styles.word1}`}>
              Scientia{" "}
            </span>
            <span className={`${styles.titleWord} ${styles.word2}`}>DAO</span>
          </div>
          <div className={styles.tagline}>
            <span className={`${styles.titleWord} ${styles.word2}`}>
              Publish & share{" "}
            </span>
            <span className={`${styles.titleWord} ${styles.word1}`}>
              your research on the
            </span>
            <span className={`${styles.titleWord} ${styles.word2}`}>
              {" "}
              world&#39;s first DAO{" "}
            </span>
            <span className={`${styles.titleWord} ${styles.word1}`}>
              community for SCIENTISTS
            </span>
          </div>
          <button className={styles.button} role="button">
            Explore DAO
          </button>
        </div>

        <div className={styles.hero}>
          <Image src={hero} />
        </div>
      </main>

      {/* join section */}
      <div className={styles.section}>
        <FeaturesSection />
      </div>

      {/* join section */}
      <div className={styles.section}>
        <JoinSection />
      </div>

      {/* what more */}
      <div className={styles.section}>
        <WhatMore />
      </div>
    </div>
  );
}

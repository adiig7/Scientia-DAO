import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import hero from "../src/assets/hero.png";
import scientist from "../src/assets/scientist.png";
import exp from "../src/assets/exp.png";
import chemist from "../src/assets/chemist.png";
import image from "../src/assets/genius-bg.png";
import image8 from "../src/assets/8_bg.png";
import one from "../src/assets/13_bg.png";
import grants from "../src/assets/grants.png";
import FeaturesCard from "../src/components/FeaturesCard";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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
          {/* <Image src={hero} /> */}
          <Image src={hero} />
        </div>
      </main>

      <div className={styles.features}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word2}`}>Why</span>
          <span className={`${styles.titleWord} ${styles.word1}`}> Join</span>
          <span className={`${styles.titleWord} ${styles.word2}`}>
            {" "}
            Scientia
          </span>
          <span className={`${styles.titleWord} ${styles.word1}`}> DAO</span>
          <span className={`${styles.titleWord} ${styles.word2}`}> ?</span>
        </div>

        {/* <div className={styles.feature_card}>
          <ul>
            <li>lorem</li>
            <li>lorem</li>
            <li>lorem</li>
          </ul>
          <Image src={image} />
        </div> */}

        <div className={styles.carousel}>
          <Carousel
            width={"100%"}
            // axis={"verticals"}
            // verticalSwipe={'vertical'}
            // autoFocus={true}
            // autoPlay={true}
            // interval={6000}
            // useKeyboardArrows={true}
            // swipeable={true}
            // showThumbs={false}
          >
            {/* slide 1 */}
            <div>
              <div className={styles.feature_card}>
                <div>
                  <div className={styles.title}>
                    <span className={`${styles.titleWord} ${styles.word2}`}>
                      What
                    </span>
                    <span className={`${styles.titleWord} ${styles.word1}`}>
                      {" "}
                      is
                    </span>
                    <span className={`${styles.titleWord} ${styles.word2}`}>
                      {" "}
                      Scientia
                    </span>
                    <span className={`${styles.titleWord} ${styles.word1}`}>
                      {" "}
                      DAO
                    </span>
                    <span className={`${styles.titleWord} ${styles.word2}`}>
                      {" "}
                      ?
                    </span>
                  </div>
                  <p>
                    World&#39;s first DAO Community for Scientists &#38;
                    Researchers.
                    <br />
                    <br />
                    Researchers from around the world can become DAO member and
                    get access to lot more
                    <br />
                    <br />
                    Slide next &#38; see what else
                    <br />
                    we got for you...
                  </p>
                </div>
                <Image src={image} />
              </div>
            </div>
            {/* next slide */}
            <div>
              <div className={styles.feature_card}>
                <div>
                  <div className={styles.title}>
                    <span className={`${styles.titleWord} ${styles.word2}`}>
                      Contribute
                    </span>
                    <span className={`${styles.titleWord} ${styles.word1}`}>
                      {" "}
                      &#38;
                    </span>
                    <span className={`${styles.titleWord} ${styles.word2}`}>
                      {" "}
                      Collaborate
                    </span>
                  </div>
                  <p>
                    Publish your work &#38; get valuable input from scienitsts
                    around the globe.
                    <br />
                    <br />
                    What more ?
                    <br />
                    You can also collaborate with other DAO members on
                    researches and earn rewards and contributor NFT
                  </p>
                </div>
                <Image src={exp} />
              </div>
            </div>
            {/* next slide */}
            <div>
              <div className={styles.feature_card}>
                <div>
                  <div className={styles.title}>
                    <span className={`${styles.titleWord} ${styles.word1}`}>
                      What&#39;s
                    </span>
                    <span className={`${styles.titleWord} ${styles.word2}`}>
                      {" "}
                      for
                    </span>
                    <span className={`${styles.titleWord} ${styles.word1}`}>
                      {" "}
                      general
                    </span>
                    <span className={`${styles.titleWord} ${styles.word2}`}>
                      {" "}
                      audience ?
                    </span>
                    
                  </div>
                  <p>
                    Now you must be thinking if this DAO is for scientists,
                    what's there for you?
                    <br />
                    <br />
                    Well we got you covered 😉
                    <br />
                    <br />
                    You can read research papers in explore section and support the work monetarily by 
                    minting the the research paper as NFT
                  </p>
                </div>
                {/* <Image src={image8} /> */}
                <Image src={chemist} />
              </div>
            </div>
            {/* next slide */}
            <div>
              <div className={styles.feature_card}>
                <div>
                  <div className={styles.title}>
                    <span className={`${styles.titleWord} ${styles.word2}`}>
                      Apply 
                    </span>
                    <span className={`${styles.titleWord} ${styles.word1}`}>
                      {" "}
                      For
                    </span>
                    <span className={`${styles.titleWord} ${styles.word2}`}>
                      {" "}
                      Grants
                    </span>
                    {/* <span className={`${styles.titleWord} ${styles.word1}`}>
                      {" "}
                      DAO
                    </span>
                    <span className={`${styles.titleWord} ${styles.word2}`}>
                      {" "}
                      ?
                    </span> */}
                  </div>
                  <p>
                    Once you publish your research you can apply for grants.
                    <br />
                    <br />
                    This will help you take your research to next level.
                    And as you achive milestone, you will move to next phase :D 
                    <br />
                    <br />
                    {/* Slide next &#38; see what else */}
                    <br />
                    {/* we got for you... */}
                  </p>
                </div>
                <Image src={one} />
              </div>
            </div>
          </Carousel>
        </div>
        {/* 
        <Image src={scientist} />
        <Image src={exp} />
        <Image src={chemist} />
        <Image src={image} />
        <Image src={image8} /> */}
        {/* <div className={styles.wrapper}>
          <FeaturesCard />
          <FeaturesCard />
        </div> */}
      </div>
    </div>
  );
}

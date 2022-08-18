import React from "react";
import Image from "next/image";
import exp from "../assets/exp.png";
import chemist from "../assets/chemist.png";
import image from "../assets/genius-bg.png";
import one from "../assets/13_bg.png";
import styles from "../../styles/Home.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function FeaturesSection() {
  return (
    <>
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

        <div className={styles.carousel}>
          <Carousel
            width={"100%"}
            // axis={"verticals"}
            // verticalSwipe={'vertical'}
            // autoFocus={true}
            // autoPlay={true}
            interval={6000}
            useKeyboardArrows={true}
            swipeable={true}
            showThumbs={false}
            infiniteLoop={true}
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
                    Researchers from around the world can become a DAO member
                    and get access to a lot more
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
                    Publish your work &#38; get valuable input from scientists
                    around the globe.
                    <br />
                    <br />
                    What more?
                    <br />
                    You can also collaborate with other DAO members on
                    researches and earn rewards and contributor-NFTs
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
                      audience?
                    </span>
                  </div>
                  <p>
                    Now you must be thinking: &apos;If this DAO is for
                    scientists, what&apos;s there for me?&apos;
                    <br />
                    <br />
                    Well, we got you covered! 😉
                    <br />
                    <br />
                    You can read research papers in explore section and support
                    the work monetarily by minting the research paper as an NFT.
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
                  </div>
                  <p>
                    Once you publish your research you can apply for grants.
                    <br />
                    <br />
                    This will help you to take your research to the next level.
                    And as you achieve milestones, you will move to the next
                    phase! :D
                  </p>
                </div>
                <Image src={one} />
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
}

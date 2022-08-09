import React from "react";
import styles from "../../styles/Home.module.css";
import { Carousel } from "react-responsive-carousel";
import img2 from "../assets/12_bg.png";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import Modal from "react-modal";
import NewMember from "./NewMember";

const customStyles = {
  content: {
    width: "80%",
    height: "80%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // color: 'black',
    background: "linear-gradient(316deg, #13012f 0%, #110d10  150%)",
  },
};

export default function JoinSection() {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className={styles.join_dao}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word1}`}>How</span>
          <span className={`${styles.titleWord} ${styles.word2}`}> to</span>
          <span className={`${styles.titleWord} ${styles.word1}`}> Join</span>
          <span className={`${styles.titleWord} ${styles.word2}`}> DAO ?</span>
        </div>

        <div className={styles.how_to_join}>
          <Image src={img2} />
          <div className={styles.carousel}>
            <Carousel
              autoFocus={true}
              // autoPlay={true}
              interval={6000}
              useKeyboardArrows={true}
              swipeable={true}
              showThumbs={false}
            >
              <div className={styles.carousel_div}>
                <div className={styles.title}>
                  <span className={`${styles.titleWord} ${styles.word2}`}>
                    As a
                  </span>
                  <span className={`${styles.titleWord} ${styles.word1}`}>
                    {" "}
                    Researcher /
                  </span>
                  <span className={`${styles.titleWord} ${styles.word2}`}>
                    {" "}
                    Scientist
                  </span>
                </div>

                <p>
                  Anyone who has done a research and want to showcase it can
                  become a DAO member
                  <br />
                  by minting the DAO NFT.
                  <br />
                  <br />
                  This membership is open to the first 100 researchers and then
                  the entry to the DAO will be governed by the DAO members.
                </p>
              </div>

              <div className={styles.carousel_div}>
                <div className={styles.title}>
                  <span className={`${styles.titleWord} ${styles.word1}`}>
                    As
                  </span>
                  <span className={`${styles.titleWord} ${styles.word2}`}>
                    {" "}
                    General
                  </span>
                  <span className={`${styles.titleWord} ${styles.word1}`}>
                    {" "}
                    Audience
                  </span>
                </div>
                <p>
                  Anyone around the world can come and read the published
                  researches.
                  <br />
                  <br />
                  And if you like someone&#39;s work you support them through
                  donations/grants for social good and earn yourself a
                  contributor NFT
                  <br />
                </p>
              </div>
            </Carousel>
            <button
              onClick={openModal}
              className={`${styles.button} ${styles.width}`}
              role="button"
            >
              Join DAO
            </button>
            <div className={styles.modal}>
              <Modal
                overlayClassName={styles.overlay}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="New Member Form"
                isOpen={isOpen}
              >
                <NewMember />
                <div  className={styles.close} >
                <a href="#" onClick={closeModal} className={styles.close_btn} />
                {/* <button className={styles.close_btn} onClick={closeModal}>
                  x
                </button> */}
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

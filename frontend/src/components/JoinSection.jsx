import React from "react";
import styles from "../../styles/Home.module.css";
import { Carousel } from "react-responsive-carousel";
import img2 from "../assets/12_bg.png";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import Modal from "react-modal";
import NewMember from "./NewMember";

// const customStyles = {
//   content: {
//     width: "80%",
//     height: "80%",
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     background: "linear-gradient(316deg, #13012f 0%, #110d10  150%)",
//   },
// };

export default function JoinSection() {
  // const [isOpen, setIsOpen] = useState(false);
  // function closeModal() {
  //   setIsOpen(false);
  // }
  // function closeModal() {
  //   setIsOpen(false);
  // }

  const [openForm, setOpenForm] = useState(false);

  function joinForm() {
    setOpenForm(!openForm);
    console.log(openForm);
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
              // autoFocus={true}
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
                  become a DAO member.
                  <br />
                  by clicking &#38; filling the join DAO form below
                  <br />
                  <br />
                  This membership is open to all the researchers around the world.
                  The entry is be governed by the DAO members through voting.
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
                  And if you like what we are doing, you supportus through
                  contributing to DAO for social good and earn yourself a
                  contributor NFT
                  <br />
                  <br />
                  The amount recieved from audience contribution is used to pay for grants requested by DAO members for their new research proposals
                </p>
              </div>
            </Carousel>
            <button
              // onClick={openModal}
              onClick={joinForm}
              className={`${styles.button} ${styles.width}`}
              role="button"
            >
              Join DAO
            </button>
            {/* <div className={styles.modal}>
              <Modal
                overlayClassName={styles.overlay}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="New Member Form"
                isOpen={isOpen}
              > */}
            {/* <div  className={styles.close} >
                <a href="#" onClick={closeModal} className={styles.close_btn} />
                </div>
                </Modal>
              </div> */}
          </div>
          <div className={openForm ? styles.show : styles.hide}>
            <NewMember />
          </div>
        </div>
      </div>
    </>
  );
}

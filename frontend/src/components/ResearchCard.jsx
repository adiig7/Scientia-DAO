import React from "react";
import styles from "../../styles/ResearchCard.module.css";

export default function ResearchCard() {
  return (
    <div className={styles.main}>
      <div className={styles.researches}>
        <h3>Research Title Here</h3>
        {/* <div className={styles.wrap}>
          <div>
            <h3>Research Title Here</h3>
          </div>
          <div className={styles.upvote}>
            <button className={styles.arrow}></button>
          </div>
        </div> */}

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil itaque
          repudiandae dolorum esse unde? Beatae sit cupiditate eveniet Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Nihil itaque
          repudiandae dolorum esse unde? Beatae sit cupiditate eveniet{" "}
        </p>
        <button className={styles.button}>Read Research</button>
      </div>
    </div>
  );
}

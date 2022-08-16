import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../../styles/ResearchCard.module.css";

export default function ResearchCard(props) {
  // it will display the shortend research description and all other logic on research page

  return (
    <div className={styles.main}>
      <div className={styles.researches}>
        <h3>{props.title}</h3>
        {/* <div className={styles.wrap}>
          <div>
            <h3>Research Title Here</h3>
          </div>
          <div className={styles.upvote}>
            <button className={styles.arrow}></button>
          </div>
        </div> */}
        <p>{props.description}</p>
        <Link href={`/research/${props.id}`}>
          <button className={styles.button}>Read Research</button>
        </Link>
      </div>
    </div>
  );
}

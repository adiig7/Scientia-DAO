import React from "react";
import styles from "../../styles/Member.module.css";
import Image from "next/image";

export default function ApproveGrant(props) {
  return (
    <>
      <main className={styles.grant_proposalCard}>
        <div>
          <h3>{props.idea_title}</h3>
          <p>{props.idea_desc}</p>
          <b>
            {" "}
            <u>Research Field </u>
            <p>{props.idea_field}</p>
          </b>
          {/* <div>
            <Image
              width={'200px'}
              height={'250px'}
              src={
                "https://ipfs.io/ipfs/bafybeiebtlvqo4tgm4gfgwnw4v7hlsoz7zf3coyvbt7j2d7ucabmiqyj7q/players/1.png"
              }
            />
          </div> */}
          <div className={styles.vote}>
            <button className={`${styles.button} ${styles.width}`}>
              Approve
            </button>
            <button className={`${styles.button} ${styles.width}`}>Deny</button>
          </div>
        </div>
      </main>
    </>
  );
}

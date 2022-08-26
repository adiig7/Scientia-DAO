import React from "react";
import styles from "../../styles/Footer.module.css";
import Image from "next/image";
import github from "../assets/github.svg";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        {/* <div className={styles.team_members}>
          <span>Dhruv Agarwal</span>
          <span>Kushagra Sarathe</span>
          <span>Nils Giebing</span>
          <span>Aditya Gupta</span>
        </div> */}
        <div className={styles.footer_items}>
          {/* <Image src={logo} /> */}

          <span className={styles.footer_text}>
            Scientia DAO - <b>OPEN SOURCE</b> published under the GNU GPLv3 license<br/>
            Build Scientia DAO together with us!
          </span>
          <div className={`${styles.github} `}>
            <a
              href="https://github.com/adiig7/Polygon-BUIDL-IT/"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={github} alt="GitHub Logo" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

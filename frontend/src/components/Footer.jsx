import React from "react";
import styles from "../../styles/Footer.module.css";
import Image from "next/image";
import github from "../assets/github.svg";
import logo from "../assets/logo1.png";

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
            © 2022 ALL RIGHTS RESERVED - Scientia DAO
          </span>
          <div className={`${styles.github} `}>
            <a
              href="https://github.com/adiig7/Polygon-BUIDL-IT/"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={github} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

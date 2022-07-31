import React from "react";
import styles from "../../styles/Footer.module.css";
import Image from "next/image";
import github from "../assets/github.svg";
import logo from "../assets/logo1.png";

export default function () {
  return (
    <>
      <footer className={styles.footer}>
        <div className={`${styles.githubs} `}>
        {/* <hr /> */}
        </div>
        <div className={styles.footer_items}>
          {/* <Image src={logo} /> */}

          <span className={styles.footer_text}>
            © 2022 ALL RIGHTS RESERVED - Scientia DAO
          </span>
          <div className={`${styles.github} `}>
            <Image src={github} />
          </div>
        </div>
      </footer>
    </>
  );
}

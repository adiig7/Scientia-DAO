import React, { useState } from "react";
import styles from "../../styles/Layout.module.css";
import Footer from "./Footer";
import scope from "../assets/scope-128.png";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import UnstoppableDomain from "./unstoppableDomains";

export default function Layout({ children }) {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive(!isActive);
  }

  return (
    <>
      {/* <div className={styles.container}> */}
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <Link href={"/"}>
              <div className={styles.title}>
                <span className={`${styles.titleWord} ${styles.word1}`}>
                  Scientia{" "}
                </span>
                <span className={`${styles.titleWord} ${styles.word2}`}>
                  DAO
                </span>
              </div>
            </Link>
            <div className={styles.navlogo}>
              <Image src={scope} alt="Scope" />
            </div>
          </div>
          <ul
            className={
              isActive === false
                ? styles.navmenu
                : styles.navmenu + " " + styles.active
            }
          >
            <li className={styles.navitem}>
              <Link href="/">
                <a className={styles.navlink}>Home</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/publish">
                <a className={styles.navlink}>Publish</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/explore">
                <a className={styles.navlink}>Explore</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/dashboard">
                <a className={styles.navlink}>Dashboard</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/team">
                <a className={styles.navlink}>Team</a>
              </Link>
            </li>
            {/* <li className={styles.navitem}>
              <Link href="/team">
                <a className={styles.navlink}>Team</a>
              </Link>
            </li> */}
            <li className={styles.navitem}>
              {/* <button>Connect Wallet</button> */}
              {/* <ConnectButton /> */}
              <UnstoppableDomain />
            </li>
          </ul>
          <button
            onClick={handleClick}
            className={
              isActive === false
                ? styles.hamburger
                : styles.hamburger + " " + styles.active
            }
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </nav>
      </header>

      {children}

      {/* </div> */}

      {/* Footer */}
      {/* <div className={styles.container}> */}
      <Footer />
      {/* </div> */}
    </>
  );
}

import React, { useState } from "react";
import styles from "../../styles/Layout.module.css";
import Footer from "./Footer";
import logo from "../assets/logo2.png";
import scope from "../assets/scope-128.png";
import Image from "next/image";
import Link from "next/link";

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
              {/* <Image src={logo} /> */}
              <div>Scientia DAO</div>
            </Link>
            <div className={styles.navlogo}>
              <Image src={scope} />
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
              <Link href="">
                <a className={styles.navlink}>Publish</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="">
                <a className={styles.navlink}>Browse</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <button>Connect Wallet</button>
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

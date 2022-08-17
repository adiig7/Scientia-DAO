import React from 'react'
import styles from "../../styles/Home.module.css";
import web3storage from "../assets/web3storage.svg";
import polygon from "../assets/polygon.svg";
import ipfs from "../assets/ipfs.png";
import spheron from "../assets/spheron.svg";
import learnweb3 from "../assets/learnweb3.png";
import Image from 'next/image';

export default function Poweredby() {
  return (
    <>
    <div className={styles.poweredby}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word2}`}>Powered </span>
          <span className={`${styles.titleWord} ${styles.word1}`}>By</span>
        </div>
        <div className={styles.sponsor_images}>
          <div className={styles.sponsor}>
            <a href="https://learnweb3.io" target="_blank" rel="noreferrer">
            <Image src={learnweb3} />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://polygon.technology" target="_blank" rel="noreferrer">
            <Image src={polygon} />
            </a>
          </div>
          <div className={`${styles.sponsor} ${styles.ipfs}`}>
            <a href="https://ipfs.io" target="_blank" rel="noreferrer">
            <Image src={ipfs} />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://web3.storage" target="_blank" rel="noreferrer">
            <Image src={web3storage} />
            </a>
             <p>Web3.Storage</p>
          </div>
          <div className={styles.sponsor}>
            <a href="https://spheron.network" target="_blank" rel="noreferrer">
            <Image src={spheron } />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

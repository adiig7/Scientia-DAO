import React from 'react'
import styles from "../../styles/Home.module.css";
import web3storage from "../assets/web3storage.svg";
import polygon from "../assets/polygon.svg";
import ipfs from "../assets/ipfs.png";
import spheron from "../assets/spheron.svg";
import valist from "../assets/chainlink.svg";
import Image from 'next/image';

export default function Poweredby() {
  return (
    <>
    <div className={styles.poweredby}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word1}`}>Powered </span>
          <span className={`${styles.titleWord} ${styles.word2}`}>By</span>
        </div>
        <div className={styles.sponsor_images}>
          <div className={styles.sponsor}>
            <Image src={polygon} />
          </div>
          <div className={`${styles.sponsor} ${styles.ipfs}`}>
            <Image src={ipfs} />
          </div>
          <div className={styles.sponsor}>
            <Image src={web3storage} />
             <p>Web3.Storage</p>
          </div>
          <div className={styles.sponsor}>
            <Image src={spheron } />
          </div>
          <div className={`${styles.sponsor} ${styles.chainlink}`}>
            <Image src={valist } />
          </div>
        </div>
      </div>
    </>
  )
}

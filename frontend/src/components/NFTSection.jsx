import React from 'react'
import nft1 from "../assets/contributor-nft.png";
import nft2 from "../assets/member-nft.png";
import styles from '../../styles/Home.module.css'
import Image from 'next/image';

export default function NFTSection() {
  return (
    <div className={styles.nft_section}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word1}`}>DAO</span>
          <span className={`${styles.titleWord} ${styles.word2}`}> NFT</span>
          <span className={`${styles.titleWord} ${styles.word1}`}>
            {" "}
            Showcase
          </span>
        </div>
        
        <div className={styles.nfts}>
          <div className={styles.nft}>
            <Image className={styles.nft} src={nft1} />
          </div>
          <div className={styles.nft}>
            <Image className={styles.nft} src={nft2} />
          </div>
        </div>
    </div>
  )
}

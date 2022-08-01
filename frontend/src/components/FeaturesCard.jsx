import React from "react";
import styles from "../../styles/FeatureCard.module.css";

export default function FeaturesCard() {
  return (
    <>
      

        <div className={styles.productSpecifications}>
          <h1> Dual Sense </h1>
          <p>
            {" "}
            DualSense also adds a build-in microphone array, which will enable
            players to easily chat with friends without a headset{" "}
          </p>

          <div className={styles.productFeatures}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}></div>
              <div className={styles.featureText}>
                <p>
                  {" "}
                  <strong>Futuristic</strong>
                </p>
                <p>Design</p>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}></div>
              <div className={styles.featureText}>
                <p>
                  {" "}
                  <strong>Built-in</strong>
                </p>
                <p>Microphone</p>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}></div>
              <div className={styles.featureText}>
                <p>
                  {" "}
                  <strong>Haptic</strong>
                </p>
                <p>Feedback</p>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}></div>
              <div className={styles.featureText}>
                <p>
                  {" "}
                  <strong>Fast charge</strong>
                </p>
                <p>USB-C port</p>
              </div>
            </div>
          </div>
        </div>

        
    </>
  );
}

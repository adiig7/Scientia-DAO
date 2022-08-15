import { useState } from "react";
import styles from "../../styles/DashboardTabs.module.css";
import Account from "./Account";
import ApproveEntry from "./ApproveEntry";
import GrantsProposal from "./GrantsProposal";

export default function DashboardTabs() {
  const [toggleState, setToggleState] = useState(1);

  function toggleTab(index) {
    setToggleState(index);
    console.log(index);
  }

  return (
    <>
      <div className={styles.wrap}>
        <div
          className={
            toggleState === 1
              ? `${styles.tabs} ${styles.active_tab}`
              : styles.tabs
          }
          onClick={() => toggleTab(1)}
        >
          Your Researches
        </div>
        <div
          className={
            toggleState === 2
              ? `${styles.tabs} ${styles.active_tab}`
              : styles.tabs
          }
          onClick={() => toggleTab(2)}
        >
          Approve Entry
        </div>

        <div
          className={
            toggleState === 3
              ? `${styles.tabs} ${styles.active_tab}`
              : styles.tabs
          }
          onClick={() => toggleTab(3)}
        >
          Apply for Grants
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.content}>
          <div
            className={
              toggleState === 1
                ? `${styles.tab1} ${styles.active_content}`
                : `${styles.tab1}`
            }
          >
            <Account />
          </div>

          <div
            className={
              toggleState === 2
                ? `${styles.tab2} ${styles.active_content}`
                : `${styles.tab2}`
            }
          >
            <ApproveEntry />
          </div>

          <div
            className={
              toggleState === 3
                ? `${styles.tab3} ${styles.active_content}`
                : `${styles.tab3}`
            }
          >
            <GrantsProposal />
          </div>
        </div>
      </main>
    </>
  );
}

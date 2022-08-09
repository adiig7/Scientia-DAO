import { useState } from "react";
import styles from "../../styles/DashboardTabs.module.css";

export default function DashboardTabs() {

  const [toggleState, setToggleState] = useState(1);

  function toggleTab(index) {
    setToggleState(index);
    console.log(index);
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.wrap}>
          <div
            className={
              toggleState === 1
                ? `${styles.tabs} ${styles.active_tab}`
                : styles.tabs
            }
            onClick={() => toggleTab(1)}
          >
            Account
          </div>
          <div
            className={
              toggleState === 2
                ? `${styles.tabs} ${styles.active_tab}`
                : styles.tabs
            }
            onClick={() => toggleTab(2)}
          >
            Approve
          </div>
          <div
            className={
              toggleState === 3
                ? `${styles.tabs} ${styles.active_tab}`
                : styles.tabs
            }
            onClick={() => toggleTab(3)}
          >
            Grants
          </div>
        </div>

        <div className={styles.wrap}>


        <div
          className={
            toggleState === 1
              ? `${styles.tab1} ${styles.active_content}`
              : styles.tab1
          }
        >
          <h2>Researches</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vitae
            numquam in, ea provident cum explicabo corporis, quibusdam dicta
            assumenda neque sunt ullam nesciunt! Sequi eligendi quaerat
            temporibus officia iusto.
          </p>
        </div>

        <div
          className={
            toggleState === 2
              ? `${styles.tab2} ${styles.active_content}`
              : styles.tab2
          }
        >
          <h2>Approve Entry</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vitae
            numquam in, ea provident cum explicabo corporis, quibusdam dicta
            assumenda neque sunt ullam nesciunt! Sequi eligendi quaerat
            temporibus officia iusto.
          </p>
        </div>

        <div
          className={
            toggleState === 3
              ? `${styles.tab3} ${styles.active_content}`
              : styles.tab3
          }
        >
          <h2>Grants</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vitae
            numquam in, ea provident cum explicabo corporis, quibusdam dicta
            assumenda neque sunt ullam nesciunt! Sequi eligendi quaerat
            temporibus officia iusto.
          </p>
        </div>
        </div>
      </main>
    </>
  );
}

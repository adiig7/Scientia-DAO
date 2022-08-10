import React from "react";
import MemberCard from "./MemberCard";
import styles from "../../styles/Member.module.css";

export default function ApproveEntry() {
  return (
    <>
      <div className={styles.entry_requests}>
        <div className={styles.card}>
          <MemberCard
            member_name={"Aditya Gupta"}
            member_bio={
              "Backend Developer with experience in building android applications, loves writing smart contracts   "
            }
            member_field={"Backend Development"}
          />
        </div>
        <div className={styles.card}>
          <MemberCard
            member_name={"Dhruv Agarwal"}
            member_bio={
              "Fullstack Developer who loves writing smart contracts and building fun projects "
            }
            member_field={"Fullstack Development"}
          />
        </div>

        <div className={styles.card}>
          <MemberCard
            member_name={"Nils Giebing"}
            member_bio={
              "Backend Developer Based in Germany, loves to travel and contribute to communities."
            }
            member_field={"Backend Developer"}
          />
        </div>

        <div className={styles.card}>
          <MemberCard
            member_name={"Kusahgra Sarathe"}
            member_bio={
              "I am a frontend developer with experience in bug bounty hunting. I am learning to code these days"
            }
            member_field={"Frontend Development"}
          />
        </div>
      </div>
    </>
  );
}

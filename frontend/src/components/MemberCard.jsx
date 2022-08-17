import React, { useState } from "react";
import styles from "../../styles/Member.module.css";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "../../constants/constants";

/// check Voting Remaining
export default function MemberCard(props) {
  const [hasVoted, setHasVoted] = useState(false);
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Member_contract = useContract({
    addressOrName: DAOMember_Contract_Address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  // returns if user has voted or not
  const check = async () => {
    try {
      console.log("checking the user for the Voting");
      const response = await Member_contract.getVoterStatus(address, props.id);
      console.log(response);
      /// fetch the true or not status and check if that is right , then only allow them to vote and show the vote button
      setHasVoted(response);
    } catch (error) {
      console.log(error);
    }
  };

  /// getting all the members of the DAO , Scientists who have already joined the DAO
  const Vote = async (_vote, _id) => {
    try {
      /// display notification of voting start
      console.log("Adding the Vote to the contract");
      let vote = _vote === "YES" ? 0 : 1;
      const tx = await Member_contract.vote(vote, _id);
      await tx.wait();
      console.log("Voting Completed for the user");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   check();
  // }, []);

  return (
    <>
      <main className={styles.proposalCard}>
        <div>
          <h3>{props.member_name}</h3>
          <p>{props.member_bio}</p>
          <b>
            {" "}
            <u> Field of Expertise</u>
          </b>
          <h3>{props.member_field}</h3>
          <div className={styles.vote}>
            <button
              onClick={() => Vote("YES", props.id)}
              className={`${styles.button} ${styles.width}`}
            >
              Approve
            </button>
            <button
              onClick={() => Vote("NO", props.id)}
              className={`${styles.button} ${styles.width}`}
            >
              Deny
            </button>
          </div>
          {/* {hasVoted ? (
            <div className={styles.vote}>
              <button
                onClick={() => Vote("YES", props.id)}
                className={`${styles.button} ${styles.width}`}
              >
                Approve
              </button>
              <button
                onClick={() => Vote("NO", props.id)}
                className={`${styles.button} ${styles.width}`}
              >
                Deny
              </button>
            </div>
          ) : (
            <a>Already Voted</a>
          )} */}
        </div>
      </main>
    </>
  );
}

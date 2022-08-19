import React, { useState, useEffect } from "react";
import styles from "../../styles/Member.module.css";
import Image from "next/image";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { Grants_ABI, Grants_Contract_Address } from "../../constants/constants";

// check voting remaining
export default function ApproveGrant(props) {
  const [hasVoted, setHasVoted] = useState(false);
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Grant_contract = useContract({
    addressOrName: Grants_Contract_Address,
    contractInterface: Grants_ABI,
    signerOrProvider: signer || provider,
  });

  /// getting all the members of the DAO , Scientists who have already joined the DAO
  const Vote = async (_vote, _id) => {
    try {
      console.log("Adding the Vote to the contract");
      let vote = _vote === "YES" ? 0 : 1;
      const tx = await Grant_contract.vote(vote, _id);
      await tx.wait();
      console.log("Voting Completed for the user");
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    if (!isConnected) {
      notify("Connect your wallet first");
    } else {
      check();
    }
  }, []);

  return (
    <>
      <main className={styles.grant_proposalCard}>
        <div>
          <h3>{props.idea_title}</h3>
          <p>{props.idea_desc}</p>
          <b>
            {" "}
            <u>Research Field </u>
            <p>{props.idea_field}</p>
          </b>
          {/* <div>
            <Image
              width={'200px'}
              height={'250px'}
              src={
                "https://ipfs.io/ipfs/bafybeiebtlvqo4tgm4gfgwnw4v7hlsoz7zf3coyvbt7j2d7ucabmiqyj7q/players/1.png"
              }
            />
          </div> */}
          {!hasVoted ? (
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
            <a> Already voted</a>
          )}
          {/* <div className={styles.vote}>
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
          </div> */}
        </div>
      </main>
    </>
  );
}

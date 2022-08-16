import React from "react";
import styles from "../../styles/Member.module.css";

export default function MemberCard(props) {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Member_contract = useContract({
    addressOrName: DAOMember_Contract_address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  /// getting all the members of the DAO , Scientists who have already joined the DAO
  const Vote = async (_vote, _id) => {
    try {
      console.log("Adding the Vote to the contract");
      let vote = _vote === "YES" ? 0 : 1;
      const tx = await Member_contract.vote(vote, _id);
      await tx.wait();
      console.log("Voting Completed for the user");
    } catch (error) {
      console.log(error);
    }
  };
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
        </div>
      </main>
    </>
  );
}

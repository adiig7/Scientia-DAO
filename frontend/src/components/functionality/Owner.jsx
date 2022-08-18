// to complete or end voting , for grants and members
// to pay for the grants , transfer
// access onlyowner Functions

import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  Grants_ABI,
  Grants_Contract_Address,
  DAOMember_ABI,
  OwnerAddress,
} from "../../../constants/constants";
import styles from '../../../styles/Home.module.css'

const Owner = async () => {
  const [isOwner, setIsOwner] = useState(false);
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Grant_contract = useContract({
    addressOrName: Grants_Contract_Address,
    contractInterface: Grants_ABI,
    signerOrProvider: signer || provider,
  });

  const Member_contract = useContract({
    addressOrName: DAOMember_Contract_address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  /// to check if the user is the owner or not
  const checkOwner = () => {
    if (address == OwnerAddress) {
      setIsOwner(true);
      console.log("Owner Verified");
    } else {
      setIsOwner(false);
      console.log("You are not the Owner");
    }
  };

  // Ending the vote for Member addition
  const EndVoteMembers = async (_id) => {
    try {
      console.log("Ending the Vote for Member");
      const tx = await Member_contract.addMember(_id);
      await tx.wait();
      console.log("Voting Ended and the member added to the DAO");
    } catch (error) {
      console.log(error);
    }
  };

  // ending the vote for Grants
  const EndVoteGrants = async (_requestId) => {
    try {
      console.log("Ending the Voting for Grants...");
      const tx = await Grant_contract.endRequest(_requestId);
      await tx.wait();
      console.log("Voting Ended");
    } catch (error) {
      console.log(error);
    }
  };

  ///  paying the grants
  const PayGrants = async (_grantId) => {
    try {
      console.log("Paying Grant to the user ");
      const tx = await Grant_contract.transferFunds(_grantId);
      await tx.wait();
      console.log("Grant paid to the user");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkOwner();
  });
};

export default function OwnerUI() {

  return(
    <>
      <div className={styles.owner}>
        <h1>Admin Section</h1>
        <input className={styles.owner_input} type="text" />
        <div>
        <button className={styles.button}>End Member Vote</button>
        <button className={styles.button}>End Grants Vote</button>
        <button className={styles.button}>Pay Grant</button>
        </div>
      </div>
    </>
  )
}

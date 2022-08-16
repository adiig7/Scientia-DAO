// to approve a particular entry from the membe ontract

import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_address,
} from "../../../constants/constants";

const VoteEntry = async () => {
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
};

export default VoteEntry;

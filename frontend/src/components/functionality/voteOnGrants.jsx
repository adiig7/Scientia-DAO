/// to vote on the proposals of the Grants by the members
import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  Grants_ABI,
  Grants_Contract_Address,
} from "../../../constants/constants";

const VoteEntry = async () => {
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

  /// fetching the requested grants
  const fetch = async () => {
    try {
      const TotalGrants = await Grant_contract._GrantsRequests;
      const promises = [];
      for (let id of TotalGrants) {
        const requestsPromise = Grant_contract.getRequests(id); // NOTE: We did NOT use await here
        promises.push(requestsPromise);
      }

      const requests = await Promise.all(promises);
      console.log(requests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get();
  });
};

export default VoteEntry;

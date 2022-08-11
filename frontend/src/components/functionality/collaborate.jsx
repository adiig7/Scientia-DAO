/// to collaborate on a particular idea and enroll themselves in this

import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  Grants_ABI,
  Grants_Contract_Address,
} from "../../../constants/constants";

const Collaborate = async () => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Grant_contract = useContract({
    addressOrName: Grants_Contract_Address,
    contractInterface: Grants_ABI,
    signerOrProvider: signer || provider,
  });

  /// joining the project as a conrtibutor
  /// Id of the collaborations
  const Join = async (_id, _addresss) => {
    try {
      console.log("Joining the collabration");
      const tx = await Grant_contract.Collabrate(_id, _addresss);
      await tx.wait();
      console.log("Joined the project for Collabration");
    } catch (error) {
      console.log(error);
    }
  };

  /// Opening up for collaborations
  /// Id of the open requests to open for Collaborations
  const OpenCollaboration = async (_requestId, _collaborators) => {
    try {
      const tx = await Grant_contract.OpenForCollabrations(
        _requestId,
        _collaborators
      );
    } catch (error) {
      console.log(error);
    }
  };

  /// fetching the Open Collaborations
  /// All the open Collaborations are shown
  /// We might need to fetch for a specific user , to allow him to get the project open for collaborations
  /// Or We can just ask at the time of registering the request that if the user wants to open the request for collaborations
  const fetch = async () => {
    try {
      const TotalCollaborations = await Grant_contract._collaborations;
      const promises = [];
      for (let id of TotalCollaborations) {
        const requestsPromise = Grant_contract.getCollaborations(id); // NOTE: We did NOT use await here
        promises.push(requestsPromise);
      }

      const collaborations = await Promise.all(promises);
      console.log(collaborations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get();
  });
};

export default Collaborate;

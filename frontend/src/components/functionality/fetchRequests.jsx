/// to show all the members profile on the page for Collabration on projects
/// just to showcase
/// to fetch all the research work going on in the DAO stored in the contract
// render the same
// proposals now contains all proposal structs\
import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_address,
} from "../../../constants/constants";

const fetchRequests = async () => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Member_contract = useContract({
    addressOrName: DAOMember_Contract_address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  /// getting all the members of the DAO , Scientists who have already joined the DAO
  const get = async () => {
    try {
      const TotalMembers = await Member_contract.counterMembers;
      const promises = [];
      for (let id of TotalMembers) {
        const membersPromise = Member_contract.getMembers(id); // NOTE: We did NOT use await here
        promises.push(membersPromise);
      }

      const members = await Promise.all(promises);
      console.log(members);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get();
  });
};

export default fetchRequests;

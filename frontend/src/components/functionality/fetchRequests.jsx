/// fetches all the open requests for entering the DAO
// render the same
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
      const TotalRequest = await Member_contract.counterResearches;
      const promises = [];
      for (let id of TotalRequest) {
        const requestsPromise = Member_contract.getRequest(id); // NOTE: We did NOT use await here
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

export default fetchRequests;

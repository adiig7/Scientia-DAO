/// to fetch all the research work going on in the DAO stored in the contract
// render the same
// proposals now contains all proposal structs\
import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_address,
} from "../../../constants/constants";

const fetchMembersResearches = async () => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Member_contract = useContract({
    addressOrName: DAOMember_Contract_address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  const get = async () => {
    try {
      console.log("Fetching all the resarches for the user... ");
      const researches = await Member_contract.getMembersResearch(id);
      console.log(researches);
      console.log("Researches fetched and rendering");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get();
  });
};

export default fetchMembersResearches;

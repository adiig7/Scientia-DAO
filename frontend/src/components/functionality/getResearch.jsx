// to fetch a single research to be able to render on the research page

// to fetch researches for a single user  , in the dashboard
import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_address,
} from "../../../constants/constants";

const getResearch = async () => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Member_contract = useContract({
    addressOrName: DAOMember_Contract_address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  const get = async (id) => {
    try {
      console.log("Fetchig the Resarch from the contract");
      const researches = await Member_contract.getResearch(id);
      console.log(researches);
      console.log("Research fetched , rendering the page");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get();
  });
};

export default getResearch;

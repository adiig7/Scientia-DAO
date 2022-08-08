import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_address,
} from "../../constants/constants";
import { StoreContent } from "./StoreResearch";

/// add the research tot the dao member contract
export const AddResearch = async () => {
  const [researchFiles, setResearchFiles] = useState([]);
  const [researchURI, setResearchURI] = useState("");

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Member_contract = useContract({
    addressOrName: DAOMember_Contract_address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  // 1. stores the files onto IPFS via web3.storage
  const StoreResearch = async () => {
    try {
      const cid = await StoreContent(researchFiles);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      setResearchURI(URL);
      console.log("Research uploaded to IPFS");
    } catch (err) {
      console.log(err);
    }
  };

  // 2. will be called later to add the uri to the contract
  const add = async () => {
    try {
      console.log("Adding the Research ....");
      const tx = await Member_contract.addResearch(researchURI);
      await tx.wait();
      console.log("Research added to your profile");
    } catch (error) {
      console.log(error);
    }
  };
};

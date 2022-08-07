/// create a request to join the DAO , not allowed directly , will be approved by the intial DAO members
/// Every user has to go through the same process, to create a request first
import React, { useEffect } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";
import {
  DAOMember_ABI,
  DAOMember_Contract_address,
} from "../../constants/constants";
import { StoreContent } from "./StoreResearch";

/// we will use this component directly
export const Request = async () => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Member_contract = useContract({
    addressOrName: DAOMember_Contract_address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  const storePfp = async () => {
    try {
      const cid = await StoreContent(pfp);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      console.log("Pfp uploaded to IPFS");
    } catch (err) {
      console.log(err);
    }
  };

  const StoreResearch = async () => {
    try {
      const cid = await StoreContent(researchFiles);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      console.log("Research uploaded to IPFS");
    } catch (err) {
      console.log(err);
    }
  };

  const request = async () => {
    try {
      console.log("Creating the request...");
      const tx = await Member_contract.addRequest(
        Name,
        bio,
        pfpURI,
        foR,
        researchURI
      );
      await tx.wait();
      console.log("Request added");
    } catch (error) {}
  };
};

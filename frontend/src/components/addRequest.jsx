/// create a request to join the DAO , not allowed directly , will be approved by the intial DAO members
/// Every user has to go through the same process, to create a request first
import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_address,
} from "../../constants/constants";
import { StoreContent } from "./StoreResearch";

/// we will use this component directly to add a new user
export const Request = async () => {
  const [Name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [pfp, setPfp] = useState([]);
  const [researchFiles, setResearchFiles] = useState([]);
  const [foR, setFoR] = useState("");

  const [pfpURI, setPfpURI] = useState("");
  const [researchURI, setResearchURI] = useState("");

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Member_contract = useContract({
    addressOrName: DAOMember_Contract_address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  // 1st pfp will be storded
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

  /// 2 . then store research files
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

  /// 3.  then add these files to the contract
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

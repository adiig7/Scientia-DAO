import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_address,
} from "../../../constants/constants";
import { StoreContent } from "./StoreContent";

/// add the research tot the dao member contract
///  will be used in the publish page
export const AddResearch = async () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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

  // 1.all the Media Research files are stored on IPFS
  const Storefiles = async () => {
    try {
      const cid = await StoreContent(researchFiles);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      console.log("Media uploaded to IPFS");
      await StoreResearch(URL);
      setResearchURI(URL);
    } catch (err) {
      console.log(err);
    }
  };

  // 2. stores the files onto IPFS via web3.storage
  const StoreResearch = async (_contentURI) => {
    try {
      const cid = await StoreResearch(title, description, _contentURI);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      setResearchURI(URL);
      console.log("Research uploaded to IPFS");
      await add(URL);
    } catch (err) {
      console.log(err);
    }
  };

  // 2. will be called later to add the uri to the contract
  const add = async (url) => {
    try {
      console.log("Adding the Research ....");
      const tx = await Member_contract.addResearch(url);
      await tx.wait();
      console.log("Research added to your profile");
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };
};

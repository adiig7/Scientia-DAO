/// to request for grant regarding a particular idea , user need to fill a form ,
/// then later a request is added to the contract
/// and DAO members can check and create propasals for the vote

import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  Grants_ABI,
  Grants_Contract_Address,
} from "../../../constants/constants";
import { StoreContent } from "./StoreContent";
import { StoreRequests } from "./StoreRequests";

const RequestGrant = async () => {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Grants_contract = useContract({
    addressOrName: Grants_Contract_Address,
    contractInterface: Grants_ABI,
    signerOrProvider: signer || provider,
  });

  // 1.all the Media files are stored on IPFS
  const Storefiles = async () => {
    try {
      const cid = await StoreContent(files);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      console.log("Media uploaded to IPFS");
      await StoreIdea(URL);
    } catch (error) {
      console.log(error);
    }
  };

  // 2.  Stores the Idea JSON file on IPFS
  const StoreIdea = async (contentURI) => {
    try {
      const cid = await StoreRequests(title, description, contentURI);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      console.log("Request JSON uploaded to IPFS");
      await request(cid);
    } catch (err) {
      console.log(err);
    }
  };

  // Add this request to the contract , creating a transaction
  const request = async (_cid) => {
    try {
      console.log("Creating the Request...");
      const _amount = ethers.utils.parseEther(amount);
      const tx = await Grants_contract.requestGrant(_cid, _amount);
      await tx.wait();
      console.log("Request Completed");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get();
  });
};

export default requestGrant;

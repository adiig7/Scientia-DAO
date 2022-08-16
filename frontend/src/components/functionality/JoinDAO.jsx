/// create a request to join the DAO , not allowed directly , will be approved by the intial DAO members
/// Every user has to go through the same process, to create a request first
import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_address,
} from "../../../constants/constants";
import {
  MemberNFT_ABI,
  MemberNFT_Contract_Address,
} from "../../../constants/constants";
import { StoreResearch } from "./StoreResearch";
import { StoreContent } from "./StoreContent";
import { _toEscapedUtf8String } from "ethers/lib/utils";

/// we will use this component directly to add a new user
export const JoinDAO = async () => {
  const [Name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [pfp, setPfp] = useState([]);
  const [researchFiles, setResearchFiles] = useState([]);
  const [foR, setFoR] = useState("");

  const [pfpURI, setPfpURI] = useState("");
  const [researchURI, setResearchURI] = useState([]);

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Member_contract = useContract({
    addressOrName: DAOMember_Contract_address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  const MemberNFT_contract = useContract({
    addressOrName: MemberNFT_Contract_address,
    contractInterface: MemberNFT_ABI,
    signerOrProvider: signer || provider,
  });

  // 1st pfp will be stored
  const StorePfp = async () => {
    try {
      const cid = await StoreContent(pfp);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      console.log("Pfp uploaded to IPFS");
      setPfpURI(URL);
      await StoreResearch(URL);
    } catch (err) {
      console.log(err);
    }
  };

  /// 2 . then store research files
  const StoreResearch = async (pfpuri) => {
    try {
      const cid = await StoreContent(researchFiles);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      console.log("Research uploaded to IPFS");
      setResearchURI(URL);
      request(pfpuri, researchuri);
    } catch (err) {
      console.log(err);
    }
  };

  /// 3.  then add these record to the contract
  const request = async (pfpuri, researchuri) => {
    try {
      console.log("Creating the request...");
      const tx = await Member_contract.addRequest(
        Name,
        bio,
        pfpuri,
        foR,
        researchuri
      );
      await tx.wait();
      console.log("Request added");
    } catch (error) {}
  };

  /// NFT  minting button will be available in the dashboard after approval from the users
  const Mint = async () => {
    try {
      console.log("Checking Elgibility");
      const check = await Member_contract.getApproval(address);
      if (check) {
        console.log("Minting the NFT");
        const tx = await MemberNFT_contr act.safeMint(address);
        await tx.wait();
        console.log("NFT minted , Congrats you are a DAO member");
        console.log(tx);
      } else {
        console.log("Not eligible for NFT minting");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

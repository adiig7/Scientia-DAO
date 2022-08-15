import styles from "../../styles/Member.module.css";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { Grants_ABI, Grants_Contract_Address } from "../../constants/constants";
import { StoreContent } from "./functionality/StoreContent";
import { StoreResearch } from "./functionality/StoreResearch";

export default function GrantsProposal() {
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
    } catch (err) {
      console.log(err);
    }
  };

  // 2.  Stores the Idea JSON file on IPFS
  const StoreIdea = async (contentURI) => {
    try {
      const cid = await StoreResearch(title, description, contentURI);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      console.log("Request JSON uploaded to IPFS");
      await request(URL);
    } catch (err) {
      console.log(err);
    }
  };

  // Add this request to the contract , creating a transaction
  const request = async (_contentURI) => {
    try {
      console.log("Creating the Request...");
      // const _amount = ethers.utils.parseEther(amount);
      const _amount = ethers.utils.parseEther("0");
      const tx = await Grants_contract.requestGrant(_contentURI, _amount);
      await tx.wait();
      console.log("Request Completed");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Starting uplaoad");
      await Storefiles();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.idea}>
        Enter Research Idea
        <input
          className={styles.research_title}
          type="text"
          placeholder="Research Idea Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="">Describe your Idea</label>
        <small className={styles.small}> &#40; minimum 200 words &#41;</small>
        <textarea
          className={styles.research_desc}
          name=""
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id=""
          placeholder="Describe the research idea "
        ></textarea>
        Upload any media files
        <input
          className={styles.research_docs}
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <div className={styles.center}>
          <button className={styles.button} onClick={handleSubmit}>
            Submit Proposal{" "}
          </button>
        </div>
      </div>
    </main>
  );
}

import React, { useState } from "react";
import styles from "../../styles/Member.module.css";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
  MemberNFT_ABI,
  MemberNFT_Contract_Address,
} from "../../constants/constants";
import { StoreContent } from "./functionality/StoreContent";

export default function NewMember() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [foR, setFoR] = useState("");
  const [research, setResearch] = useState([]);

  const [pfpURI, setPfpURI] = useState("");
  const [researchURI, setResearchURI] = useState([]);

  const provider = useProvider();
  const { data: signer } = useSigner();
  // const { address, isConnected } = useAccount();

  const Member_contract = useContract({
    addressOrName: DAOMember_Contract_Address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  // const MemberNFT_contract = useContract({
  //   addressOrName: MemberNFT_Contract_Address,
  //   contractInterface: MemberNFT_ABI,
  //   signerOrProvider: signer || provider,
  // });

  // 1st pfp will be storded
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
  const StoreResearch = async (_pfpuri) => {
    try {
      console.log("Storing the files ");
      const cid = await StoreContent(research);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      console.log("Research uploaded to IPFS");
      setResearchURI(URL);
      request(_pfpuri, URL);
    } catch (err) {
      console.log(err);
    }
  };

  /// 3.  then add these record to the contract
  const request = async (_pfpuri, _researchuri) => {
    try {
      console.log("Creating the request...");
      const tx = await Member_contract.addRequest(name, bio, "", foR, []);
      await tx.wait();
      console.log("Request added");
    } catch (error) {}
  };

  const handleSubmit = async () => {
    try {
      if (!research == 0) {
        await StoreResearch("");
      } else {
        await request("", "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.newMember}>
        <div className={styles.title_small}>
          <span className={`${styles.titleWord} ${styles.word2}`}>Create</span>
          <span className={`${styles.titleWord} ${styles.word1}`}> DAO</span>
          <span className={`${styles.titleWord} ${styles.word2}`}> Entry</span>
          <span className={`${styles.titleWord} ${styles.word1}`}>
            {" "}
            Proposal
          </span>
        </div>
        {/* <label>Profile Picture</label>
        <input className={styles.research_docs} type="file" accept="image/*, image/png, image/jpeg" /> */}
        <label>Enter Your Name</label>
        <input
          required
          placeholder="Name"
          value={name}
          className={styles.member_name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <label>
          Describe Yourself <small> &#40; minimum 150 words &#41; </small>
        </label>
        <textarea
          required
          placeholder="Bio"
          className={styles.member_bio}
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <label>Field of Research </label>
        <input
          required
          placeholder="Research Field"
          className={styles.member_name}
          type="text"
          value={foR}
          onChange={(e) => setFoR(e.target.value)}
        />
        <label>
          Previous Researches <small> &#40; optional &#41; </small>{" "}
        </label>
        <input
          className={styles.member_name}
          type="file"
          onChange={(e) => setResearch(e.target.files)}
          multiple
        />
        <div className={styles.center}>
          <button className={styles.button} onClick={handleSubmit}>
            Submit Proposal
          </button>
        </div>
      </div>
    </>
  );
}

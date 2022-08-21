import React, { useState, useEffect } from "react";
import styles from "../../styles/Member.module.css";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
  MemberNFT_ABI,
  MemberNFT_Contract_Address,
} from "../../constants/constants";
import { StoreContent } from "./functionality/StoreContent";
import { StoreMember } from "./functionality/StoreMembers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import Link from "next/link";

export default function NewMember() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [foR, setFoR] = useState("");
  const [research, setResearch] = useState([]);

  const [pfpURI, setPfpURI] = useState("");
  const [researchURI, setResearchURI] = useState([]);

  const [isMember, setIsMember] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const notify = (message) => toast(`${message}`);

  const [eligibleToMint, setEligibleToMint] = useState(false);

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Member_contract = useContract({
    addressOrName: DAOMember_Contract_Address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  const MemberNFT_contract = useContract({
    addressOrName: MemberNFT_Contract_Address,
    contractInterface: MemberNFT_ABI,
    signerOrProvider: signer || provider,
  });

  // // 1st pfp will be storded
  // const StorePfp = async () => {
  //   try {
  //     const cid = await StoreContent(pfp);
  //     const URL = `https://ipfs.io/ipfs/${cid}`;
  //     console.log(URL);
  //     console.log("Pfp uploaded to IPFS");
  //     setPfpURI(URL);
  //     await StoreResearch(URL);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  ///setting the profile of the the user
  const storeMember = async () => {
    try {
      setLoading(true);
      setMessage("Storing the Details on IPFS...");
      /// show storing Member details to IPFS notification
      console.log("Storing the files ");
      /// Start loading
      const cid = await StoreMember(name, bio, foR);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      /// end loading and show the URL to the user to browse
      console.log("Member details uploaded to IPFS");
      setPfpURI(URL);
      setLoading(false);
      if (research == 0) {
        await request(cid, "");
      } else {
        await StoreResearch(cid);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      notify(err);
    }
  };

  /// 2 . then store research files
  const StoreResearch = async (_pfpCID) => {
    try {
      setLoading(true);
      setMessage("Storing the files on IPFS..");
      /// show storing research to IPFS notification
      console.log("Storing the files ");
      /// startLoading
      const cid = await StoreContent(research);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      console.log("Research uploaded to IPFS");
      /// end loading and show the URL to the user
      setResearchURI(URL);
      setLoading(false);
      /// calling request with the users detail CID and the CID of the research
      request(_pfpCID, cid);
    } catch (err) {
      console.log(err);
      notify(err);
    }
  };

  /// 3.  then add these record to the contract
  const request = async (_pfpCID, _researchCID) => {
    try {
      setLoading(true);
      setMessage("Adding request , Confirm the Tx -->");
      /// show creating tx request notification
      console.log("Creating the request...");
      const tx = await Member_contract.addRequest(_pfpCID, [_researchCID]);
      // start Loading
      setMessage("Confirming the tx...");
      await tx.wait();
      // end loading
      console.log("Request added");
      // alert("Request added");
      setLoading(false);
      setIsUploaded(true);
    } catch (error) {
      console.log(error);
      notify(error.message);
      setLoading(false);
    }
  };

  const Mint = async () => {
    try {
      if (eligibleToMint) {
        console.log("Minting the NFT");
        const tx = await MemberNFT_contract.safeMint(address);
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

  const check = async () => {
    console.log("Checking Eligibility");
    const check = await Member_contract.getApproval(address);
    const data = await MemberNFT_contract.balanceOf(address);
    const value = parseInt(data._hex);
    console.log(value);
    console.log(check);
    if (check && value == 0) {
      setEligibleToMint(true);
    } else {
      setIsMember(true);
    }
    ////data will return a value , that returns and check if the user is not the owner of any NFT earlier
  };

  useEffect(() => {
    if (!isConnected) {
      notify("Connect your wallet first");
    } else {
      check();
      // setEligibleToMint(true);
      // setIsMember(true);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      await storeMember();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      {isMember ? (
        <>
          {!loading ? (
            <>
              {!isUploaded ? (
                <div className={styles.newMember}>
                  <div className={styles.title_small}>
                    <span className={`${styles.titleWord} ${styles.word2}`}>
                      Create
                    </span>
                    <span className={`${styles.titleWord} ${styles.word1}`}>
                      {" "}
                      DAO
                    </span>
                    <span className={`${styles.titleWord} ${styles.word2}`}>
                      {" "}
                      Entry
                    </span>
                    <span className={`${styles.titleWord} ${styles.word1}`}>
                      {" "}
                      Proposal
                    </span>
                  </div>
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
                    Describe Yourself{" "}
                    <small> &#40; minimum 150 words &#41; </small>
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
                    {/* {eligibleToMint ? (
                      <button className={styles.button} onClick={Mint}>
                        Mint NFT
                      </button>
                    ) : (
                      <a>Not yet Approved</a>
                    )} */}
                  </div>
                  <label>Note: Don't submit multiple request proposals</label>
                </div>
              ) : (
               <>
              <div>
                {" "}
                <div className={styles.title_small}>
                  <span className={`${styles.titleWord} ${styles.word1}`}>
                    Request sent for Approval{" "}
                  </span>{" "}
                  🚀
                  <span className={`${styles.titleWord} ${styles.word2}`}>
                    Checkout request here:{" "}
                    <br />
                    <a className={`${styles.titleWord} ${styles.word1}`} href={pfpURI}>
                      {" "}
                      <u> {pfpURI} </u>
                    </a>
                  </span>
                </div>
              </div>
            </>
              )}
            </>
          ) : (
            <>
              <Loading _loading={loading} _message={message} />
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

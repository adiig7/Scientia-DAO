import React, { useState, useEffect } from "react";
import styles from "../styles/Publish.module.css";
import Head from "next/head";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
  MemberNFT_ABI,
  MemberNFT_Contract_Address,
} from "../constants/constants";
import { StoreContent } from "../src/components/functionality/StoreContent2";
import { StoreResearch } from "../src/components/functionality/StoreResearch";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../src/components/Loading";

export default function () {
  const notify = (message) => toast(`${message}`);

  const [isMember, setIsMember] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [researchFiles, setResearchFiles] = useState([]);
  const [researchURI, setResearchURI] = useState("");
  const [filesURI, setfilesURI] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  const check = async () => {
    try {
      setLoading(true);
      console.log("Checking Member status ");
      const check = await MemberNFT_contract.balanceOf(address);
      console.log(check);
      const value = parseInt(check._hex);
      console.log(value);
      if (value > 0) {
        setIsMember(true);
        notify("You are a DAO member :D");
        console.log("Congrats !! You are a DAO member, Enjoy ");
      } else {
        console.log(
          "Oops ! You are not a DAO member , Join DAO to acces the website "
        );
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // 1.all the Media Research files are stored on IPFS
  const storefiles = async () => {
    try {
      setMessage("Uploading to IPFS");
      setLoading(true);
      // notify("Uploading files to IPFS");
      console.log("Storing the files ...");
      const cid = await StoreContent(researchFiles);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      console.log("Media uploaded to IPFS");
      setMessage("Media uploaded to IPFS");
      /// saving the direct URL to the file in the research json
      await storeResearch(URL);
      setfilesURI(URL);
      setLoading(false);
    } catch (err) {
      console.log(err);
      notify(err);
    }
  };

  // 2. stores the files onto IPFS via web3.storage
  const storeResearch = async (_contentURI) => {
    try {
      setLoading(true);
      setMessage("Starting the Research file upload...");
      console.log("Starting the Research upload...");
      const cid = await StoreResearch(title, description, _contentURI);
      /// need to fetch from this link
      const URL = `https://ipfs.io/ipfs/${cid}/research.json`;
      console.log(URL);
      setResearchURI(URL);
      console.log("Research uploaded to IPFS");
      /// saving the CID in the contract
      setMessage("Research uploaded to IPFS");
      await add(cid);
      setLoading(false);
    } catch (err) {
      console.log(err);
      notify(err);
    }
  };

  // 2. will be called later to add the uri to the contract
  const add = async (_cid) => {
    try {
      setLoading(true);
      setMessage("Adding the Research ....");
      console.log("Adding the Research ....");
      const tx = await Member_contract.addResearch(_cid);
      await tx.wait();
      console.log("Research added to your profile");
      console.log(tx);
      setMessage("Research added to your profile");
      setLoading(false);
    } catch (error) {
      console.log(error);
      notify(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      await storefiles();
    } catch (error) {
      console.log(error);
      notify(error.message);
    }
  };

  // const RenderForm  = () => {
  //   return(
  //     {isMember ? (<main className={styles.main}>
  //       <div className={styles.title}>
  //         <span className={`${styles.titleWord} ${styles.word2}`}>
  //           Publish{" "}
  //         </span>
  //         <span className={`${styles.titleWord} ${styles.word1}`}>
  //           Research
  //         </span>
  //       </div>

  //       <div className={styles.publish}>
  //         Enter Research Title
  //         <input
  //           className={styles.research_title}
  //           type="text"
  //           placeholder="Research Title Here"
  //           value={title}
  //           onChange={(e) => setTitle(e.target.value)}
  //         />
  //         Enter Research Description{" "}
  //         <small className={styles.small}> &#40; Minimum 500 words &#41;</small>
  //         <textarea
  //           className={styles.research_desc}
  //           name=""
  //           id=""
  //           placeholder="Enter Research Details Here"
  //           value={description}
  //           onChange={(e) => setDescription(e.target.value)}
  //         ></textarea>
  //         Select Research Media Files
  //         <input
  //           className={styles.research_docs}
  //           type="file"
  //           multiple
  //           onChange={(e) => setResearchFiles(e.target.files)}
  //         />
  //         <button className={styles.button} onClick={handleSubmit}>
  //           {" "}
  //           Upload Research to IPFS{" "}
  //         </button>
  //       </div>
  //     </main> : }
  //   )
  // }

  useEffect(() => {
    setIsMember(true);
    if (isConnected) {
      check();
    } else {
      // ConnectButton();
      window.alert("Connect your wallet first");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Publish</title>
        <meta
          name="description"
          content="PUBLISH and SHARE YOUR RESEARCH ON THE WORLD'S FIRST DAO COMMUNITY FOR SCIENTISTS"
        />
        <link rel="icon" href="/microscope.png" />
      </Head>

      <main className={styles.main}>
        {isMember ? (
          <>
            <div className={styles.title}>
              <span className={`${styles.titleWord} ${styles.word2}`}>
                Publish{" "}
              </span>
              <span className={`${styles.titleWord} ${styles.word1}`}>
                Research
              </span>
            </div>

            <div className={styles.publish}>
              Enter Research Title
              <input
                className={styles.research_title}
                type="text"
                placeholder="Research Title Here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              Enter Research Description{" "}
              <small className={styles.small}>
                {" "}
                &#40; Minimum 500 words &#41;
              </small>
              <textarea
                className={styles.research_desc}
                name=""
                id=""
                placeholder="Enter Research Details Here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              Select Research Media Files
              <input
                className={styles.research_docs}
                type="file"
                multiple
                onChange={(e) => setResearchFiles(e.target.files)}
              />
              <button className={styles.button} onClick={handleSubmit}>
                {" "}
                Upload Research to IPFS{" "}
              </button>
            </div>
          </>
        ) : (
          <div className={styles.message}>
            <h2>You are not a DAO member yet, please apply to become member</h2>
            <div className={styles.center}>
              <Link href={"/#join"}>
                <button className={styles.button}>JoinDao</button>
              </Link>
            </div>
          </div>
        )}
        {loading ? (
          <div className={styles.main}>
            {/* <h1>Kushagra Sarathe</h1> */}
            <Loading _loading={loading} _message={message} />
          </div>
        ) : (
          <>
            <a></a>
          </>
        )}
        <ToastContainer autoClose={2000} />
      </main>
    </>
  );
}

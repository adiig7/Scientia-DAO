import styles from "../../styles/Member.module.css";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { Grants_ABI, Grants_Contract_Address } from "../../constants/constants";
import { StoreContent } from "./functionality/StoreContent2";
import { StoreRequests } from "./functionality/StoreRequests";
import ApproveGrant from "./ApproveGrant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

export function ApplyGrant() {
  const notify = (message) => toast(`${message}`);

  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const Grants_contract = useContract({
    addressOrName: Grants_Contract_Address,
    contractInterface: Grants_ABI,
    signerOrProvider: signer || provider,
  });

  // 1.all the Media files are stored on IPFS
  const Storefiles = async () => {
    try {
      setLoading(true);
      setMessage("Uploading files to IPFS ...");
      const cid = await StoreContent(files);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      console.log("Media uploaded to IPFS");
      await StoreIdea(URL);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      notify(err);
    }
  };

  // 2.  Stores the Idea JSON file on IPFS
  const StoreIdea = async (contentURI) => {
    try {
      setLoading(true);
      setMessage("Uploading the request file to IPFS ...");
      const cid = await StoreRequests(title, description, contentURI);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      console.log("Request JSON uploaded to IPFS");
      await request(URL);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      notify(err);
    }
  };

  // Add this request to the contract , creating a transaction
  const request = async (_contentURI) => {
    try {
      setLoading(true);
      setMessage("Confirm the tx to complete the request");
      console.log("Creating the Request...");
      // const _amount = ethers.utils.parseEther(amount);
      console.log(amount);
      const _amount = await ethers.utils.parseEther(amount);
      console.log(_amount);
      const tx = await Grants_contract.requestGrant(_contentURI, _amount);
      setMessage("Confirming the tx");
      await tx.wait();
      setIsUploaded(true);
      console.log("Request Completed");
      notify("Request Completed");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      notify(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Starting upload");
      await Storefiles();
    } catch (error) {
      console.log(error);
      notify(error);
    }
  };

  useEffect(() => {
    if (!isConnected) {
      notify("Connect your wallet first");
    }
  }, []);

  return (
    <main className={styles.main}>
      {isUploaded ? (
        <>
          <a>Request Created Successfully</a>
        </>
      ) : (
        <>
          {loading ? (
            <>
              <Loading _loading={loading} _message={message} />
            </>
          ) : (
            <>
              <div className={styles.title}>
                <span className={`${styles.titleWord} ${styles.word1}`}>
                  Create{" "}
                </span>
                <span className={`${styles.titleWord} ${styles.word2}`}>
                  Grant
                </span>
                <span className={`${styles.titleWord} ${styles.word1}`}>
                  {" "}
                  Proposal
                </span>
              </div>
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
                <small className={styles.small}>
                  {" "}
                  &#40; minimum 200 words &#41;
                </small>
                <textarea
                  className={styles.research_desc}
                  name=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id=""
                  placeholder="Describe the research idea "
                ></textarea>
                Enter Amount for Grant
                <input
                  className={styles.research_docs}
                  type="text"
                  // multiple
                  onChange={(e) => setAmount(e.target.value)}
                />
                Upload any media files
                <input
                  className={styles.research_docs}
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <div className={styles.center}>
                <button className={styles.button} onClick={handleSubmit}>
                  Submit Proposal{" "}
                </button>
              </div>
            </>
          )}
        </>
      )}

      <ToastContainer autoClose={2000} />
    </main>
  );
}

export default function GrantsProposal() {
  const [grants, setGrants] = useState([]);

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const notify = (message) => toast(`${message}`);

  const Grants_contract = useContract({
    addressOrName: Grants_Contract_Address,
    contractInterface: Grants_ABI,
    signerOrProvider: signer || provider,
  });

  /// fetch the grants

  // fetched the research.json
  const fetchIPFS = async (metadataURI) => {
    try {
      console.log("Fetching from IPFS ...");
      const URL = `${metadataURI}/request.json`;
      const response = await fetch(URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // fetch the data from the contract and then fetched the same from IPFS
  // returns an object that is then stored in the Array of request
  const fetchRequests = async (_id) => {
    try {
      const grantRequest = await Grants_contract.getRequests(_id);
      console.log(grantRequest.content);
      // console.log(grantRequest);
      const response = await fetchIPFS(grantRequest.content);
      const parsedRequest = {
        Id: _id,
        Name: response.Name,
        Description: response.Description,
        Media: response.Content,
      };
      console.log(parsedRequest);
      return parsedRequest;
      // return response;
    } catch (error) {
      console.log(error);
    }
  };

  // fetches the no. of requests , then fetches the each request and store the result in the array of requests
  const get = async () => {
    try {
      setLoading(true);
      setMessage("Fetching the data from contract and IPFS ...");
      console.log("starting to find grants requests ...");
      const TotalRequest = await Grants_contract._GrantsRequests();
      const total = parseInt(TotalRequest._hex);
      const promises = [];
      console.log(TotalRequest);
      console.log(total);
      for (let id = 0; id < total; id++) {
        const requestsPromise = fetchRequests(id);
        promises.push(requestsPromise);
      }
      const _Grantrequests = await Promise.all(promises);
      console.log(_Grantrequests);
      console.log("ending...");
      /// set the array of the objects of the requests is stored and can be rendered then
      setGrants(_Grantrequests);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      notfiy(error);
    }
  };

  useEffect(() => {
    if (!isConnected) {
      notify("Connect your wallet first");
    }
    get();
  }, []);

  return (
    <>
      <ToastContainer autoClose={2000} />
      {loading ? (
        <>
          <Loading _loading={loading} _message={message} />
        </>
      ) : (
        <div className={styles.flex}>
          <div className={styles.title}>
            <span className={`${styles.titleWord} ${styles.word2}`}>Open </span>
            <span className={`${styles.titleWord} ${styles.word1}`}>
              Grant{" "}
            </span>
            <span className={`${styles.titleWord} ${styles.word2}`}>
              Proposals
            </span>
          </div>
          <div className={styles.grant_proposal}>
            {grants ? (
              grants.map((grant) => {
                return (
                  <div className={styles.grant_card} key={grant.Id}>
                    <ApproveGrant
                      idea_title={grant.Name}
                      idea_desc={grant.Description}
                      id={grant.Id}
                      key={grant.Id}
                    />
                  </div>
                );
              })
            ) : (
              <a>No Grant Requests</a>
            )}
          </div>
        </div>
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import ResearchCard from "../src/components/ResearchCard";
import styles from "../styles/Explore.module.css";
import Head from "next/head";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "../constants/constants";

export default function explore() {
  const [researches, setResearches] = useState([]);
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Member_contract = useContract({
    addressOrName: DAOMember_Contract_Address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  // fetched the member.json
  const fetchIPFS = async (metadataURI) => {
    try {
      console.log("Fetching from IPFS ...");
      const URL = `https://ipfs.io/ipfs/${metadataURI}/research.json`;
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
      const request = await Member_contract.getResearch(_id);
      console.log(request.researchPaperURI);
      const response = await fetchIPFS(request.researchPaperURI);
      const parsedRequest = {
        Id: _id,
        Title: response.Name,
        Description: response.Description,
        Content: response.contentURL,
      };
      console.log(parsedRequest);
      return parsedRequest;
    } catch (error) {
      console.log(error);
    }
  };

  // fetches the no. of requests , then fetches the each request and store the result in the array of requests
  const get = async () => {
    try {
      console.log("starting ...");
      const TotalRequest = await Member_contract.counterResearches();
      const total = parseInt(TotalRequest._hex);
      const promises = [];
      console.log(total);
      for (let id = 0; id < total; id++) {
        const requestsPromise = fetchRequests(id);
        promises.push(requestsPromise);
      }
      const _researches = await Promise.all(promises);
      console.log(_researches);
      console.log("ending...");
      /// set the array of the objects of the requests is stored and can be rendered then
      setResearches(_researches);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <Head>
        <title>Explore</title>
        <meta
          name="description"
          content="PUBLISH and SHARE YOUR RESEARCH ON THE WORLD'S FIRST DAO COMMUNITY FOR SCIENTISTS"
        />
        <link rel="icon" href="/microscope.png" />
      </Head>

      <div className={styles.main}>
        <div className={styles.title}>
          <span className={`${styles.titleWord} ${styles.word1}`}>
            Published{" "}
          </span>
          <span className={`${styles.titleWord} ${styles.word2}`}>
            Researches
          </span>
        </div>
        <div className={styles.researches}>
          {researches ? (
            researches.map((research) => {
              return (
                <ResearchCard
                  title={research.Title}
                  description={research.Description}
                  id={research.Id}
                />
              );
            })
          ) : (
            <a>No researches present</a>
          )}

          {/* <ResearchCard />
          <ResearchCard /> */}
        </div>
      </div>
    </>
  );
}

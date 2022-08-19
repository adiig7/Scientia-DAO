import React, { useEffect, useState } from "react";
import ResearchCard from "./ResearchCard";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "../../constants/constants";
import styles from '../../styles/Publish.module.css'

export default function Account() {
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
  const fetchIPFS = async (metadataURI, _key) => {
    try {
      console.log("Fetching from IPFS ...");
      const URL = `https://ipfs.io/ipfs/${metadataURI}/research.json`;
      const response = await fetch(URL);
      const data = await response.json();
      const parsedRequest = {
        Id: _key,
        Title: data.Name,
        Description: data.Description,
        Content: data.Content,
      };
      console.log(parsedRequest);
      return parsedRequest;
    } catch (error) {
      console.log(error);
    }
  };

  // fetch the data from the contract and then fetched the same from IPFS
  // returns an object that is then stored in the Array of request
  const fetchRequests = async () => {
    try {
      const researches = await Member_contract.getMembersResearch(address);
      /// researches will be an array of all  the research papers
      const promises = [];
      /// we need to fetch the data from ipfs for each element
      researches.map((research, key) => {
        const researchPromise = fetchIPFS(research.researchPaperURI, key);
        promises.push(researchPromise);
      });
      const _researches = await Promise.all(promises);
      setResearches(_researches);
    } catch (error) {
      console.log(error);
    }
  };

  // fetches the no. of requests , then fetches the each request and store the result in the array of requests
  const get = async () => {
    try {
      console.log("starting ...");
      const _researches = await fetchRequests();
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
    <main>
      <div>
        {researches ? (
          researches.map((research, key) => {
            return (
              <ResearchCard
                title={research.Title}
                description={research.Description}
                id={research.Id}
                key={key}
              />
            );
          })
          ) : (
          <div className={styles.message}>
          <h2>
            No Researches Found
          </h2>
          </div>
        )}
      </div>
    </main>
  );
}

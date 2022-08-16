import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import styles from "../../styles/Member.module.css";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "../../constants/constants";

export default function ApproveEntry() {
  const [requests, setRequests] = useState([]);

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
      const URL = `https://ipfs.io/ipfs/${metadataURI}/member.json`;
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
      const request = await Member_contract.getRequest(_id);
      console.log(request.ipfsURI);
      const response = await fetchIPFS(request.ipfsURI);
      const parsedRequest = {
        Id: _id,
        Name: response.Name,
        Bio: response.Bio,
        For: response.FoR,
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
      const TotalRequest = await Member_contract.counterRequestList();
      const total = parseInt(TotalRequest._hex);
      const promises = [];
      console.log(TotalRequest);
      console.log(total);
      for (let id = 0; id < total; id++) {
        const requestsPromise = fetchRequests(id);
        promises.push(requestsPromise);
      }
      const _requests = await Promise.all(promises);
      console.log(_requests);
      console.log("ending...");
      /// set the array of the objects of the requests is stored and can be rendered then
      setRequests(_requests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get();
  }, []);

  // pass the id to the member card , the id is the requestId for the member to add
  // Render the request Array and pass the details to this Member Card
  return (
    <>
      <div className={styles.entry_requests}>
        {requests ? (
          requests.map((request) => {
            return (
              <div className={styles.card}>
                <MemberCard
                  member_name={request.Name}
                  member_bio={request.Bio}
                  member_field={request.For}
                  id={request.Id}
                />
              </div>
            );
          })
        ) : (
          <a>No new Requests</a>
        )}

        {/* <div className={styles.card}>
          <MemberCard
            member_name={"Aditya Gupta"}
            member_bio={
              "Backend Developer with experience in building android applications, loves writing smart contracts   "
            }
            member_field={"Backend Development"}
            // id={}
          />
        </div>
        <div className={styles.card}>
          <MemberCard
            member_name={"Dhruv Agarwal"}
            member_bio={
              "Fullstack Developer who loves writing smart contracts and building fun projects "
            }
            member_field={"Fullstack Development"}
          />
        </div>

        <div className={styles.card}>
          <MemberCard
            member_name={"Nils Giebing"}
            member_bio={
              "Backend Developer Based in Germany, loves to travel and contribute to communities."
            }
            member_field={"Backend Developer"}
          />
        </div>

        <div className={styles.card}>
          <MemberCard
            member_name={"Kusahgra Sarathe"}
            member_bio={
              "I am a frontend developer with experience in bug bounty hunting. I am learning to code these days"
            }
            member_field={"Frontend Development"}
          />
        </div> */}
      </div>
    </>
  );
}

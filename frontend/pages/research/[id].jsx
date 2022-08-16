import React, { useEffect, useState } from "react";
import styles from "../../styles/Research.module.css";
import Head from "next/head";
import Image from "next/image";
import Contribute from "../../src/components/Contribute";
import { useRouter } from "next/dist/client/router";
// import { Contribute } from "../index";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "../../constants/constants";

export default function () {
  const [research, setResearch] = useState({});
  const router = useRouter();
  const { id } = router.query;

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
      console.log(_id);
      const request = await Member_contract.getResearch(_id);
      console.log(request);
      console.log(request.researchPaperURI);
      const _date = new Date(
        parseInt(request.dateOfPublication._hex)
      ).toLocaleString();
      console.log(_date);
      const response = await fetchIPFS(request.researchPaperURI);
      console.log(response);
      const parsedRequest = {
        Id: _id,
        Title: response.Name,
        Description: response.Description,
        Content: response.Content,
        Publisher: request.researcher,
        DoP: _date,
      };
      console.log(parsedRequest);
      setResearch(parsedRequest);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRequests(id);
    }
  }, [id]);

  let url =
    "https://ipfs.io/ipfs/bafybeiebtlvqo4tgm4gfgwnw4v7hlsoz7zf3coyvbt7j2d7ucabmiqyj7q/players/1.png";

  return (
    <>
      <Head>
        <title>Read Research</title>
        <meta
          name="description"
          content="PUBLISH and SHARE YOUR RESEARCH ON THE WORLD'S FIRST DAO COMMUNITY FOR SCIENTISTS"
        />
        <link rel="icon" href="/microscope.png" />
      </Head>

      <main className={styles.main}>
        <h2>{research.Title}</h2>
        {/* <small>
          {" "}
          &#40; by 0x8c0Bf9B1BFa0dc00f7eC63ac528010Fbeb818CA6 &#41;
        </small> */}
        <div className={styles.research}>
          <p>{research.Description}</p>
          <h3>Research Media </h3>
          <div className={styles.media}>
            <div>
              <Image
                src={research.Content}
                alt="Media Files for the Research"
                width={200}
                height={200}
              />
            </div>
            {/* <div>
              <Image
                src={url}
                alt="Picture of the author"
                width={200}
                height={200}
              />
            </div> */}
          </div>
          <Contribute />
        </div>
      </main>
    </>
  );
}

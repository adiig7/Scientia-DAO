/// to fetch all the research work going on in the DAO stored in the contract
// render the same
// proposals now contains all proposal structs\
import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_address,
} from "../../../constants/constants";

const FetchResearches = async () => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const Member_contract = useContract({
    addressOrName: DAOMember_Contract_address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  const Totalresearches = await Member_contract.counterResearches;
  const promises = [];
  for (let id of Totalresearches) {
    const researchPromise = Member_contract.getResearch(id); // NOTE: We did NOT use await here
    promises.push(researchPromise);
  }

  const researches = await Promise.all(promises);
  console.log(researches);

  // const get = async () => {
  //   try {
  //     const Totalresearches = await Member_contract.counterResearches;
  //     const promises = [];
  //     for (let id of Totalresearches) {
  //       const researchPromise = contract.getResearch(id); // NOTE: We did NOT use await here
  //       promises.push(researchPromise);
  //     }

  //     const researches = await Promise.all(promises);
  //     console.log(researches);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   get();
  // });
};

export default fetchResearches;

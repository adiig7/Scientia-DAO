import React, { useEffect, useState } from "react";
import {
  useAccount,
  useContract,
  useProvider,
  useSigner,
  useSendTransaction,
  usePrepareSendTransaction,
} from "wagmi";
import {
  DAOFunds_ABI,
  DAOFunds_Contract_address,
} from "../../../constants/constants";
import { ethers, utils } from "ethers";

const donation = async () => {
  const [amount, setAmount] = useState("");
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const DAOFunds_contract = useContract({
    addressOrName: DAOFunds_Contract_address,
    contractInterface: DAOFunds_ABI,
    signerOrProvider: signer || provider,
  });

  const donate = async () => {
    try {
      console.log("Accepting the donations...");
      const _amount = ethers.utils.parseEther(amount);
      const { config } = usePrepareSendTransaction({
        request: {
          to: DAOFunds_Contract_address,
          value: _amount,
        },
      });

      /// sendTransaction is called whenever we want to create the transaction
      const { data, sendTransaction } = await useSendTransaction(config);
      console.log("Transaction Completed");
      console.log("Thank you for your contribution");
    } catch (error) {
      console.log(error);
    }
  };
};

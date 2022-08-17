import styles from "../../styles/Research.module.css";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useContract,
  useProvider,
  useSigner,
  useSendTransaction,
  usePrepareSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import {
  DAOFunds_ABI,
  DAOFunds_Contract_Address,
  ContributorNFT_ABI,
  ContributorNFT_Contract_Address,
} from "../../constants/constants";
import { ethers, utils } from "ethers";

export default function Contribute() {
  const [amount, setAmount] = useState("");
  const [hasDonated, setHasDonated] = useState(false);
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const DAOFunds_contract = useContract({
    addressOrName: DAOFunds_Contract_Address,
    contractInterface: DAOFunds_ABI,
    signerOrProvider: signer || provider,
  });

  const ContributorNFT_contract = useContract({
    addressOrName: ContributorNFT_Contract_Address,
    contractInterface: ContributorNFT_ABI,
    signerOrProvider: signer || provider,
  });

  // const _amount = ethers.utils.parseEther(amount);
  const { config } = usePrepareSendTransaction({
    request: {
      to: DAOFunds_Contract_Address,
      value: amount ? ethers.utils.parseEther(amount) : undefined,
    },
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const donate = async () => {
    try {
      console.log("Accepting the donations...");
      console.log(amount);
      // const _amount = ethers.utils.parseEther(amount);
      // console.log(_amount);
      // const { config } = usePrepareSendTransaction({
      //   request: {
      //     to: DAOFunds_Contract_Address,
      //     value: _amount,
      //   },
      // });
      // /// sendTransaction is called whenever we want to create the transaction
      // const { data, sendTransaction } = useSendTransaction(config);
      const tx = await sendTransaction();
      await tx.wait();
      check();
      console.log("Transaction Completed");
      console.log("Thank you for your contribution");
      mint();
    } catch (error) {
      console.log(error);
    }
  };

  const mint = async () => {
    try {
      console.log("Checking the Elgibility...");
      const check = await DAOFunds_contract.getContribution(address);
      console.log(check);
      if (check) {
        console.log("You are eligible...");
        console.log("Minting the NFT");
        const tx = await ContributorNFT_contract.safeMint(address);
        await tx.wait();
        console.log("NFT minted, Check the collection on OpenSea");
      } else {
        console.log("not eligible for NFT minting");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   check;
  // }, [isSuccess]);

  const check = async () => {
    try {
      console.log("checking User");
      /// connect wallet first then only allow the user to move ahead
      // create a check first
      const data = await DAOFunds_contract.getContribution(address);
      /// filter the bool value from the response
      console.log(check);
      setHasDonated(check);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      await donate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <>
        <div className={styles.contribute}>
          <h3>Support DAO for Grants</h3>
          <input
            placeholder="Enter Amount to Contribute"
            className={styles.amount}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Contribute
          </button>
          {/* {hasDonated ? (
            <button className={styles.button} onClick={mint}>
              Mint NFT
            </button>
          ) : (
            <a>Not yet Donated</a>
          )} */}
        </div>
      </>
    </>
  );
}

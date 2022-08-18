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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

export default function Contribute() {
  const [amount, setAmount] = useState("");
  const [hasDonated, setHasDonated] = useState(false);
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  const notify = (message) => toast(`${message}`);

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
      setLoading(true);
      setMessage("Accepting the donations, Confirm the Tx...");
      console.log("Accepting the donations, Confirm the Tx...");
      console.log(amount);
      const tx = await sendTransaction();
      setMessage("Waiting for confirmation...");

      // console.log(tx);
      // console.log("Transaction Completed");
      // console.log("Thank you for your contribution");
      // notify("Thank you for your contribution");
      // setLoading(false);
      // mint();
    } catch (error) {
      console.log(error);
      setLoading(false);
      notify(error.message);
    }
  };

  const mint = async () => {
    try {
      setLoading(true);
      setMessage("Checking the Elgibility..");
      console.log("Checking the Elgibility...");
      const check = await DAOFunds_contract.getContribution(address);
      console.log(check);
      if (check) {
        console.log("You are eligible...");
        console.log("Minting the NFT");
        setMessage("Minitng the NFT , Confirm tx -->");
        const tx = await ContributorNFT_contract.safeMint(address);
        setMessage("Waiting for confirmation...");
        await tx.wait();
        console.log("NFT minted, Check the collection on OpenSea");
        notify("NFT minted, Check the collection on OpenSea");
      } else {
        console.log("not eligible for NFT minting");
        notify("not eligible for NFT minting");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      notify(error.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("Transaction Completed");
      console.log("Thank you for your contribution");
      notify("Thank you for your contribution");
      setLoading(false);
      mint();
    }
  }, [isSuccess]);

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
      <ToastContainer autoClose={2000} />
      {!loading ? (
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
            {hasDonated ? <a>Thank for your Contribution</a> : <a></a>}
          </div>
        </>
      ) : (
        <>
          <Loading _loading={loading} _message={message} />
        </>
      )}
    </>
  );
}

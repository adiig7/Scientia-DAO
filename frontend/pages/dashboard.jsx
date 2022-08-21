import React, { useState, useEffect } from "react";
import DashboardTabs from "../src/components/DashboardTabs";
import styles from "../styles/Dashboard.module.css";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../src/components/Loading";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  MemberNFT_ABI,
  MemberNFT_Contract_Address,
  OwnerAddress,
} from "../constants/constants";
import Owner from "../src/components/Owner";
import Link from "next/link";

export default function Dashboard() {
  const notify = (message) => toast(`${message}`);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

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
      setLoading(false);
    }
  };

  /// to check if the user is the owner or not
  const checkOwner = () => {
    if (address == OwnerAddress) {
      setIsOwner(true);
      console.log("Owner Verified");
      notify("Owner Verified");
    } else {
      setIsOwner(false);
      console.log("You are not the Owner");
      notify("You are not the Owner");
    }
  };

  useEffect(() => {
    if (!isConnected) {
      notify("Connect your wallet first");
    } else {
      check();
      checkOwner();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="PUBLISH and SHARE YOUR RESEARCH ON THE WORLD'S FIRST DAO COMMUNITY FOR SCIENTISTS"
        />
        <link rel="icon" href="/microscope.png" />
      </Head>

      <main className={styles.main}>
        <ToastContainer autoClose={2000} />
        {isOwner ? (
          <>
            <Owner />
          </>
        ) : (
          <></>
        )}
        {isMember ? (
          <>
            <div className={styles.title}>
              <span className={`${styles.titleWord} ${styles.word2}`}>
                Member{" "}
              </span>
              <span className={`${styles.titleWord} ${styles.word1}`}>
                Dashboard
              </span>
            </div>
            <DashboardTabs />
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
      </main>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  MemberNFT_ABI,
  MemberNFT_Contract_Address,
} from "../../../constants/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const TokenGating = async () => {
  const [isMember, setIsMember] = useState(false);
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
      console.log("Checking Member status ");
      const check = await MemberNFT_contract.balanceOf(address);
      const value = parseInt(check.value._hex);
      console.log(value);
      if (value > 0) {
        setIsMember(true);
        console.log("Congrats !! You are a DAO member, Enjoy ");
      } else {
        console.log(
          "Oops ! You are not a DAO member , Join DAO to acces the website "
        );
        // Response.Redirect("url#JoinSection");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      check();
    } else {
      ConnectButton();
      window.alert("Connect your wallet first");
    }
  }, []);

  return isMember;
};

const { ethers } = require("hardhat");

async function main() {
  const nft = "0x5bbE072fAeE291af2E4D611B24F4B20B74f62A0f";
  const funds = "0xfcE1392cE135869a6c904e1Ca7C15c427D8aEA2E";
  const GrantsContract = await ethers.getContractFactory("Grants");

  // deploy the contract
  const grantsContract = await GrantsContract.deploy(nft, funds);

  // wait for it to finish deploying
  await grantsContract.deployed();

  // print the address of the deployed contract
  console.log("Grants Contract Address:", grantsContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const { ethers } = require("hardhat");

async function main() {
  const nft = "0x2669e2b28FDf9002F691bB30C637b66290DEF5e0";
  const funds = "0x52E1f8418679423D5E30E5D2cDe15c720BB243Ca";
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

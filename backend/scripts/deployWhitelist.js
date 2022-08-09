const { ethers } = require("hardhat");

async function main() {
  const whitelistContract = await ethers.getContractFactory("Whitelist");

  // deploy the contract
  const WhitelistContract = await whitelistContract.deploy(100);

  // wait for it to finish deploying
  await WhitelistContract.deployed();

  // print the address of the deployed contract
  console.log("Whitelist Contract Address:", WhitelistContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

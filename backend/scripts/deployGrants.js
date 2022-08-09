const { ethers } = require("hardhat");

async function main() {
  const GrantsContract = await ethers.getContractFactory("Grants");

  // deploy the contract
  const grantsContract = await GrantsContract.deploy();

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

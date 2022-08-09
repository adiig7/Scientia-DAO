const { ethers } = require("hardhat");

async function main() {
  const DAOContract = await ethers.getContractFactory("DAOFunds");

  // deploy the contract
  const deployedDAOContract = await DAOContract.deploy();

  // wait for it to finish deploying
  await deployedDAOContract.deployed();

  // print the address of the deployed contract
  console.log("DAO Funds Contract Address:", deployedDAOContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

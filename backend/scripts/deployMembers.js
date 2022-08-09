const { ethers } = require("hardhat");

async function main() {
  const MembersContract = await ethers.getContractFactory("DAOMembers");

  // deploy the contract
  const membersContract = await MembersContract.deploy();

  // wait for it to finish deploying
  await membersContract.deployed();

  // print the address of the deployed contract
  console.log("Members Contract Address:", membersContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

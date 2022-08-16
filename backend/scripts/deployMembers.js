const { ethers } = require("hardhat");

async function main() {
  const nft = "0x2669e2b28FDf9002F691bB30C637b66290DEF5e0";
  const MembersContract = await ethers.getContractFactory("newDAOMember");

  // deploy the contract
  const membersContract = await MembersContract.deploy(nft);

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

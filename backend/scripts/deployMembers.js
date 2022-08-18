const { ethers } = require("hardhat");

async function main() {
  const nft = "0xd60123082CEd26d0a970ddeFE350A08aB3680207";
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

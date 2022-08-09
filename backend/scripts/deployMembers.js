const { ethers } = require("hardhat");

async function main() {
  const nft = "0x5bbE072fAeE291af2E4D611B24F4B20B74f62A0f";
  const MembersContract = await ethers.getContractFactory("DAOMember");

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

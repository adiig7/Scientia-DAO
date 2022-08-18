const { ethers } = require("hardhat");

async function main() {
  const nft = "0xd60123082CEd26d0a970ddeFE350A08aB3680207";
  const funds = "0x259260e02f5106501efadEd8E6407A46D8a32d09";
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

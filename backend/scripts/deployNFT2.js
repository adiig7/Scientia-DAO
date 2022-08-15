const { ethers } = require("hardhat");

async function main() {
  const NFTContract = await ethers.getContractFactory("ContributorNFT");
  const DAO_Funds = "0x52E1f8418679423D5E30E5D2cDe15c720BB243Ca";
  const metadata =
    "ipfs://bafkreibbiafnz7x2tcgoa2uoj5weaxbvrreryems6ws2lfsfsnffrfeatu";

  // deploy the contract
  const nftContract = await NFTContract.deploy(metadata, DAO_Funds);

  // wait for it to finish deploying
  await nftContract.deployed();

  // print the address of the deployed contract
  console.log("NFT Contract Address:", nftContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

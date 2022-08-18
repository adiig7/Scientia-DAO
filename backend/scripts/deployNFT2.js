const { ethers } = require("hardhat");

async function main() {
  const NFTContract = await ethers.getContractFactory("ContributorNFT");
  const DAO_Funds = "0x259260e02f5106501efadEd8E6407A46D8a32d09";
  const newMetadata =
    "ipfs://bafybeibz4dfk6zxsorvq5xiul7ncwuytfewpjchmhr5kf3scimst7vaete/metadata.json";
  // deploy the contract
  const nftContract = await NFTContract.deploy(newMetadata, DAO_Funds);

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

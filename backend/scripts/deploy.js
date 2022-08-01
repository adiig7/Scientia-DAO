const { ethers } = require("hardhat");

async function main() {
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so whitelistContract here is a factory for instances of our Whitelist contract.
  */
  const votingOnProposalContract = await ethers.getContractFactory("VotingOnProposal");

  // deploy the contract
  const deployedVotingOnProposalContract = await votingOnProposalContract.deploy();
  
  // wait for it to finish deploying
  await deployedVotingOnProposalContract.deployed();

  // print the address of the deployed contract
  console.log(
    "VotingOnProposal Contract Address:",
    deployedVotingOnProposalContract.address
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract VotingOnProposal{
    struct Proposal{
        address from;
        string pdfLink;
        string videolink;
        uint8 numberOfResearchers;
        uint256 numberOfResearches;
        uint256 timestamp;
    }
    
    struct Voter {
        bool HasVoted;  // if true, that person already voted
        boot ownsNFT; // how many NFTs the person owns
        uint voteIndex;   // index of the voted proposal
    }
    
    enum Vote {
        Yes, // Yes = 0
        No // No = 1
    }
    
    mapping(address => Voter) public voters;
}

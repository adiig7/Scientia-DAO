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
        bool ownsNFT;
    }
}

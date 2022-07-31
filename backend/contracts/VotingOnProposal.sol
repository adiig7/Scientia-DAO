//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract VotingOnProposal{

    uint256 proposalCount = 0;

    // details a proposal holds
    struct Proposal{
        address from;
        string pdfLink;
        string videolink;
        uint256 timestamp;
    }

    struct DAOMember{
        bool ownsNFT;
    }

    // a vote can be yes or a no
    enum Vote{
        Yes, // 1
        No // 0 
    }

    // this array stores all the proposals
    Proposal[] public proposals;

    // mapping to keep track of voters voting on proposals, where `address` is the address of the voter, `uint256` is the proposal index and `bool` is to keep track if the voter has voted on the proposal or not
    mapping(address => mapping(uint256 => bool)) hasVoted;

    modifier isADAOMember{
        require(hasVoted[msg.sender][proposalCount] == true, "You need to be a member of DAO!");
        _;
    }


    // function addProposal(string pdfLink, string videoLink) public isADAOMember(){
    //     proposals.push(Proposal(msg.sender, pdfLink, videoLink, block.timestamp));
    // }
}
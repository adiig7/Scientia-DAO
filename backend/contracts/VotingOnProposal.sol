//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// import "@openzeppelin/contracts/utils/Counters.sol";

contract VotingOnProposal{

    // using Counters for Counters.Counter; 
    
    struct Proposal{
        address from;
        string pdfLink;
        string videolink;
        uint256 timestamp;
        uint256 yayVotes;
        uint256 nayVotes;
        uint256 deadline;
    }

        event proposalAddEvent(address indexed from, string pdfLink, string videoLink, uint256 timestamp);
    
    struct Voter {
        bool ownsNFT; // how many NFTs the person owns
    }

    
    enum Vote {
        Yes, // Yes = 0
        No // No = 1
    }
    
    // mapping to keep track of voters voting on proposals, where address is the address of the voter, uint256 is the //proposal index and bool is to keep track if the voter has voted on the proposal or not
    mapping(address => mapping(uint256 => bool)) hasVoted;
    mapping(address => Voter) public voters;
    mapping(uint256 => Proposal) proposals;
    // array of proposals
    uint proposalsIndex = 0;

     modifier isADAOMember{
        require(voters[msg.sender].ownsNFT == true);
        _;
    }

    modifier isProposalActive{
        require(proposals[proposalsIndex].deadline >= block.timestamp);
    }

    modifier isProposalEnded{
        require(proposals[proposalsIndex].deadline <= block.timestamp);
    }
/*
    //function if eligible to vote and the vote itself
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.ownsNFT != 0, "Has no right to vote");
        require(!sender.HasVoted, "Already voted.");
        sender.HasVoted = true;
        sender.voteIndex = proposal;

        // If 'proposal' is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += sender.ownsNFT;
    }
    */

    function addProposal(string memory pdfLink, string memory videoLink) public isADAOMember{
        Proposal storage proposal = proposals[proposalsIndex];
        proposal.from = msg.sender;
        proposal.pdfLink = pdfLink;
        proposal.videolink = videoLink;
        proposal.deadline = block.timestamp + 7 days;
        proposal.timestamp = block.timestamp;
        // proposals.push(Proposal(msg.sender, pdfLink, videoLink, block.timestamp, 0, 0, block.timestamp + 7 days));
        proposalsIndex +=1;
        emit proposalAddEvent(msg.sender, pdfLink, videoLink, block.timestamp, 0, 0, block.timestamp + 7 days);
    }

    function vote(uint256 proposalIndex, Vote vote) public isADAOMember, isProposalActive{
        Proposal storage proposal = proposals[proposalsIndex];
        if(vote == Vote.YAY)
            proposal.yayVotes +=1;
        else
            proposal.nayVotes +=1;
    }

}

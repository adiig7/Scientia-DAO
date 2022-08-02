//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// import "@openzeppelin/contracts/utils/Counters.sol";
interface NFT {
    function balanceOf(address user) external returns (uint256);
}

contract VotingOnProposal {
    // using Counters for Counters.Counter;
    NFT nft;

    struct Proposal {
        address from;
        string pdfLink;
        string videolink;
        uint256 timestamp;
        uint256 yayVotes;
        uint256 nayVotes;
        uint256 deadline;
        uint256 amount;
    }

    event proposalAddEvent(
        address indexed from,
        string pdfLink,
        string videoLink,
        uint256 timestamp
    );

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
    mapping(uint256 => Proposal) public proposals;
    // holds the list of proposals that have been given the grant by the DAO
    mapping(uint256 => Proposal) public acceptedProposals;
    // array of proposals
    uint256 proposalsIndex = 0;
    uint256 acceptedProposalsIndex = 0;

    constructor(address nftContract) {
        nft = NFT(nftContract);
    }

    modifier isADAOMember() {
        require(voters[msg.sender].ownsNFT == true);
        require(nft.balanceOf(msg.sender) > 0, "You are not a DAO member");
        _;
    }

    modifier isProposalActive() {
        require(proposals[proposalsIndex].deadline >= block.timestamp);
        _;
    }

    modifier isProposalEnded() {
        require(proposals[proposalsIndex].deadline <= block.timestamp);
        _;
    }

    function addProposal(
        string memory pdfLink,
        string memory videoLink,
        uint256 amount
    ) public isADAOMember {
        proposals[proposalsIndex] = Proposal(
            msg.sender,
            pdfLink,
            videoLink,
            block.timestamp,
            0,
            0,
            block.timestamp + 7 days,
            amount
        );
        proposalsIndex += 1;
        emit proposalAddEvent(msg.sender, pdfLink, videoLink, block.timestamp);
    }

    function vote(uint256 proposalIndex, Vote vote)
        public
        isADAOMember
        isProposalActive
    {
        Proposal storage proposal = proposals[proposalIndex];
        if (vote == Vote.Yes) {
            proposal.yayVotes += 1;
        } else proposal.nayVotes += 1;
    }

    // only the DAO officials can call this function
    function executeProposal(uint256 proposalIndex, uint256 amount)
        public
        isProposalEnded
    {
        Proposal storage proposal = proposals[proposalIndex];
        if (proposal.yayVotes > proposal.nayVotes) {
            (bool sent, ) = proposal.from.call{value: amount}("");
            acceptedProposals[acceptedProposalsIndex] = proposal;
            acceptedProposalsIndex += 1;
        }
    }
}

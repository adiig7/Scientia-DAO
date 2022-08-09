// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts@4.7.2/access/Ownable.sol";

interface Funds {
    function withdrawEthTo(address payable _to, uint256 _amount)
        external
        returns (bool);
}

interface MemberNFT {
    function balanceOf(address owner) external view virtual returns (uint256);

    function safeMint(address to) external;
}

contract Grants is Ownable {
    struct Request {
        address creator;
        string content; /// content URI saved onto IPFS in form of title , description and the media
        uint256 amountRequested; /// Amount in dollars
        uint256 amountApproved; /// AMount approved by the DAO
        bool approved;
        bool paid;
        uint256 yayVotes;
        uint256 nayVotes;
        uint256 VotingStartTime;
    }

    struct Collabration {
        uint256 requestID;
        address creator;
        address[] collabrators;
        bool open;
    }

    uint256 _GrantsRequests = 0;
    uint256 _GrantsApproved = 0;
    uint256 _collaborations = 0;

    uint256 TotalAmountPaid = 0;
    uint256 votingPeroid = 7 days;

    mapping(uint256 => Request) GrantsRequests;
    mapping(uint256 => Request) GrantsApproved;

    mapping(uint256 => Collabration) collabrations;

    enum Vote {
        Yes, // Yes = 0
        No // No = 1
    }

    event GrantRejected(address indexed rejectedAddress, uint256 _id);

    MemberNFT nft;
    Funds funds;

    constructor(address NFT, address FUNDS) {
        nft = MemberNFT(NFT);
        funds = Funds(FUNDS);
    }

    /// conditional functions
    modifier onlyDAOMember() {
        require(nft.balanceOf(msg.sender) > 0, " You are not a DAO member");
        _;
    }

    function requestGrant(string memory contentURI, uint256 _amount)
        public
        onlyDAOMember
    {
        require(_amount > 0, "Amount is not right");
        GrantsRequests[_GrantsRequests] = Request(
            msg.sender,
            contentURI,
            _amount,
            _amount,
            false,
            false,
            0,
            0,
            block.timestamp
        );
        _GrantsRequests += 1;
    }

    function Vote(Vote _vote, uint256 _id) public onlyDAOMember {
        Request storage _request = GrantsRequests[_id];
        require(
            block.timestamp > _request.VotingStartTime,
            "Voting not Started "
        );
        require(
            block.timestamp < _request.VotingStartTime + votingDuration,
            "Voting has already ended"
        );
        if (_vote == Vote.YES) {
            _request.yayVotes += 1;
        } else {
            _request.nayVotes += 1;
        }
    }

    function endRequest(uint256 _id) public onlyOwner {
        Request storage _request = GrantsRequests[_id];
        require(
            block.timestamp > _request.VotingStartTime + votingDuration,
            "Voting has not yet ended"
        );
        if (_request.yayVotes > _request.nayVotes) {
            GrantsApproved[_GrantsApproved] = _request;
        } else {
            emit GrantRejected(_request.creator, _id);
        }
    }

    function transferFunds(uint256 _id) public onlyOwner {
        Request storage _grant = GrantsApproved[_id];
        require(_grant.approved, "Grant not Approved");
        require(!_grant.paid, "Grant Already Paid");
        require(
            _grant.yayVotes > _grant.nayVotes,
            "The grant can not be processed"
        );
        _grant.paid = true;
        funds.withdrawEthTo(_grant.creator, _grant.amountApproved);
    }

    function getRequests(uint256 _id) public view returns (Request memory) {
        return GrantsRequests[_id];
    }

    function getGrants(uint256 _id) public view returns (Request memory) {
        return GrantsApproved[_id];
    }

    function OpenForCollabrations(uint256 _requestId) public onlyDAOMembers {
        require(_requestId <= _GrantsRequests, "Request does not exsist");
        collabrations[_collaborations] = Collabration(
            _requestId,
            msg.sender,
            0,
            true
        );
    }

    function Collabrate(uint256 _id, address memory collaborator)
        public
        onlyDAOMembers
    {
        require(_id <= _collaborations, "Not exsist");
        require(collaborator != address(0), "Address not valid");
        Collabration memory _collaboration = collabrations[_id];
        _collaboration.collabrators.push(collaborator);
    }

    function getCollaborations(uint256 _id)
        public
        returns (Collabration memory)
    {
        return collabrations[_id];
    }
}

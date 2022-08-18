// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/access/Ownable.sol";

interface Funds {
    function withdrawEthTo(address _to, uint256 _amount)
        external
        returns (bool);
}

interface NFT {
    function balanceOf(address owner) external view returns (uint256);

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

    uint256 public _GrantsRequests = 0;
    uint256 public _GrantsApproved = 0;
    uint256 public _collaborations = 0;

    uint256 public TotalAmountPaid = 0;
    uint256 public votingDuration = 7 days;

    mapping(uint256 => Request) public GrantsRequests;
    mapping(uint256 => Request) public GrantsApproved;

    mapping(uint256 => mapping(address => bool)) public voters;

    mapping(uint256 => Collabration) public collabrations;

    enum Vote {
        Yes, // Yes = 0
        No // No = 1
    }

    event GrantRejected(address indexed rejectedAddress, uint256 _id);

    NFT nft;
    Funds funds;

    constructor(address _NFT, address _Funds) {
        nft = NFT(_NFT);
        funds = Funds(_Funds);
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
            0,
            false,
            false,
            0,
            0,
            block.timestamp
        );
        _GrantsRequests += 1;
    }

    function vote(Vote _vote, uint256 _id) public onlyDAOMember {
        Request storage _request = GrantsRequests[_id];
        require(
            block.timestamp > _request.VotingStartTime,
            "Voting not Started "
        );
        require(
            block.timestamp < _request.VotingStartTime + votingDuration,
            "Voting has already ended"
        );
        require(voters[_id][msg.sender] == false, "You have already voted");
        if (_vote == Vote.Yes) {
            _request.yayVotes += 1;
        } else {
            _request.nayVotes += 1;
        }
        voters[_id][msg.sender] == true;
    }

    function endRequest(uint256 _id) public {
        Request storage _request = GrantsRequests[_id];
        require(
            block.timestamp > _request.VotingStartTime + votingDuration,
            "Voting has not yet ended"
        );
        if (_request.yayVotes > _request.nayVotes) {
            _request.approved = true;
            _request.amountApproved = _request.amountRequested;
            GrantsApproved[_GrantsApproved] = _request;
        } else {
            emit GrantRejected(_request.creator, _id);
        }
    }

    /// just a mock function for the chainlink keepers to be able to close the open requestss
    function _perform() public {
        for (uint256 id = 0; id < _GrantsRequests; id++) {
            Request storage _request = GrantsRequests[id];
            require(
                block.timestamp > _request.VotingStartTime + votingDuration,
                "Voting hasn't ended yet for this member!"
            );
            endRequest(id);
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
        TotalAmountPaid += _grant.amountApproved;
        funds.withdrawEthTo(_grant.creator, _grant.amountApproved);
    }

    function getRequests(uint256 _id) public view returns (Request memory) {
        return GrantsRequests[_id];
    }

    function getGrants(uint256 _id) public view returns (Request memory) {
        return GrantsApproved[_id];
    }

    function OpenForCollabrations(
        uint256 _requestId,
        address[] memory collaborators
    ) public onlyDAOMember {
        require(_requestId <= _GrantsRequests, "Request does not exsist");
        collabrations[_collaborations] = Collabration(
            _requestId,
            msg.sender,
            collaborators,
            true
        );
    }

    function Collabrate(uint256 _id, address collaborator)
        public
        onlyDAOMember
    {
        require(_id <= _collaborations, "Not exsist");
        require(collaborator != address(0), "Address not valid");
        Collabration storage _collaboration = collabrations[_id];
        _collaboration.collabrators.push(collaborator);
    }

    function getCollaborations(uint256 _id)
        public
        returns (Collabration memory)
    {
        return collabrations[_id];
    }

    ///returns the status of a voter whether they have voted or not
    function getVoterStatus(address _user, uint256 _id)
        public
        view
        returns (bool)
    {
        return voters[_id][_user];
    }
}

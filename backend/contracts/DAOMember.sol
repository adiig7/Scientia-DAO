//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface MemberNFT {
    function balanceOf(address owner) external view virtual returns (uint256);

    function safeMint(address to) external;
}

contract DAOMember {
    event ApprovalMemberRejected(address indexed rejectedAddress);
    struct ResearchPaper {
        address researcher;
        uint256 dateOfPublication; //time when the paper is published
        string researchPaperURI;
    }
    struct Member {
        address memberAddress;
        string name;
        string bio;
        uint256 yayVotes;
        uint256 nayVotes;
        uint256 votingStartTime;
        string pfpURI; /// profile picture URI
        string foR; /// field of research
        string[] researchesURI; /// string array of ipfsURI
    }

    /// cases for voting for adding a member
    enum Vote{
        YES,
        NO
    }

    uint256 public votingDuration = 2 days;

    uint256 public counterResearches = 0;
    uint256 public counterMembers = 0;
    uint256 public counterRequestList = 0;

    MemberNFT nft;

    /// record of all the members of the DAO for their details
    mapping(uint256 => Member) public membersList;

    /// requests to add new member
    mapping(uint256 => Member) public requestList;

    /// mapping from memberAddress -->  research paper
    mapping(address => ResearchPaper) public membersPaperList;

    /// mapping from researchNo -->researchPaper
    mapping(uint256 => ResearchPaper) public researchesPublishedList;

    constructor(address NFT) {
        nft = MemberNFT(NFT);
    }

    modifier onlyDAOMember() {
        require(nft.balanceOf(msg.sender) > 0, " You are not a DAO member");
        _;
    }

    /// @dev - To add the research
    /// @param  researchPaperURI -ipfs uri for the research

    function addResearch(string memory researchPaperURI) public onlyDAOMember {
        /// add the research to the common ResearchPaper Array to show it to all s
        researchesPublishedList[counterResearches] = ResearchPaper(
            msg.sender,
            block.timestamp,
            researchPaperURI
        );

        counterResearches += 1;

        /// adds the research for the specific member
        membersPaperList[msg.sender] = ResearchPaper(
            msg.sender,
            block.timestamp,
            researchPaperURI
        );
    }

    /// add member to the members array
    /// also mints the NFT from our contract directly to the user , will be easy to call it here
    function addMember(
        address _member,
        string memory _name,
        string memory _pfp,
        bool approved,
        uint256 _id
    ) public onlyDAOMember {
        Member storage member = requestList[_id];
        require(block.timestamp > member.votingStartTime + votingDuration, "Voting hasn't ended yet for this member!");
        if(member.yayVotes > member.nayVotes){
            membersList[counterMembers] = member;
            counterMembers += 1;
        }else{
            emit ApprovalMemberRejected(member.memberAddress);
        }
        // TODO : delete the member from the requestList
            }

    function addRequest(string memory _name, string memory _bio, string memory _pfpURI, string memory _foR, string[] researchesURI) public {
        requestList[counterRequestList] = Member(msg.sender, _name, _bio, 0, 0, block.timestamp, false, _pfpURI, _foR, researchesURI);
        counterRequestList+=1;
    }

    // voting function for requested member
    function vote(Vote vote, uint _id) public{
        Member storage member = requestList[_id];
        require(block.timestamp > member.votingStartTime, "You can't approve this person before the voting starts.");
        require(member.votingStartTime + votingDuration < block.timestamp, "Voting has already ended");
        if(vote = Vote.YES)
            member.yayVotes += 1;
        else
            member.nayVotes += 1;
    }

    /// @dev - To get all the researches added in the DAO
    /// @return - array that contains all the research papers
    function getResearches() public view returns(ResearchPaper[]) {
        return researchesPublishedList;
    }

    /// @dev - To get all the researches added in the DAO
    /// @param  _index - the index of the research paper to be viewed in the researchesPublishedList
    /// @return - the research paper at the given index
    function getResearch(uint _index) public view returns(ResearchPaper){
        return researchesPublishedList[_index];
    }


    /// @dev - To get all the members in the DAO
    /// @return - array that contains all the members
    function getMembers() public view returns(Member[]) {
        return membersList;
    }
}

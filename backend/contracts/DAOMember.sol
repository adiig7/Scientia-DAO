//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface MemberNFT {
    function balanceOf(address owner) external view virtual returns (uint256);

    function safeMint(address to) external;
}

contract DAOMember {
    struct ResearchPaper {
        address researcher;
        uint256 dateOfPublication;
        string researchPaperURI;
    }

    struct Member {
        address memberAddress;
        string name;
        string bio;
        string pfpURI; /// profile picture URI
        string foR; /// field of research
        string[] researchesURI; /// string array of ipfsURI
    }

    uint256 counterResearches = 0;
    uint256 counterMembers = 0;
    uint256 counterRequestList = 0;

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
        string memory _pfp
    ) public onlyDAOMember {}

    function addRequest() public {}

    function approve() public {}

    function getResearch() public view returns () {}

    function getMembers() public view returns () {}
}

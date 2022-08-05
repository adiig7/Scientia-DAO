//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.10;

contract DAOMember{
    struct ResearchPaper{
        address researcher;
        string dateOfPublication;
        string researchPaperURI;
    }
    struct Member{
        address memberAddress;
        string[] researchesURI;
    }

    uint256 counterResearches = 0;
    uint256 counterMembers = 0;

    mapping(uint256 => Member) public membersList;  
    mapping(address => ResearchPaper) public membersPaperList;  
    mapping(uint256 => ResearchPaper) public researchesPublishedList;

    function addResearch(string researchPaperURI) public returns(uint256 _id){
        researchesPublishedList[counterResearches] = ResearchPaper(msg.sender, block.timestamp, researchPaperURI);
        // membersList[counterMembers] = researchesPublishedList[counterResearches];
        counterResearches += 1;
        membersPaperList[msg.sender].researchesURI.add(researchPaperURI);
    } 

//TODO: need to complete this addMember function
    function addMember(){
        
    }
}
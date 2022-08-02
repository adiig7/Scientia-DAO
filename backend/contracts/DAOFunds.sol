// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract DAOFunds {

    uint public balanceReceived;

    function receiveETH() public payable {
        balanceReceived += msg.value;
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function withdrawETH() public {
        payable(msg.sender).transfer(getBalance());
    }

    function withdrawETHTo(address payable _to) public {
        _to.transfer(getBalance());
    }
}
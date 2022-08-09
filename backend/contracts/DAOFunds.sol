// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAOFunds is Ownable {
    /// events to keep track of ether receive and Withdrawl
    event received(address user, uint256 amount);
    event withdrawal(address user, uint256 amount);

    /// to check the balance of the DAO at any point of time
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /// withdraw eth to a paricular address in case of grants
    function withdrawEthTo(address payable _to, uint256 _amount)
        public
        onlyOwner
        returns (bool)
    {
        (bool success, ) = _to.call{value: _amount}("");
        emit withdrawal(_to, _amount);
        return success;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {
        emit received(msg.sender, msg.value);
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}

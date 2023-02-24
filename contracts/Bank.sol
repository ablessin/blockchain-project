pragma solidity >=0.5.0 <0.5.17;

import "./Token.sol";


contract Bank {
    address private token;
    address private owner;
    
    constructor(address tokenaddress) public {
        token = tokenaddress;
        owner = msg.sender;
    }

    function buy() public payable {
        require(msg.value == 1 ether, "invalid value -> 1eth = 100 token");
        address payable portefeuille = address(uint160(owner)); 
        portefeuille.transfer(msg.value); 

        require(
            Token(token).allowance(owner, address(this)) >= 100,
            "owner not allowed"
        );
        require(
            Token(token).transferFrom(owner, msg.sender, 100),
            "transfert fail"
        );
    }

    function afficherBalance() public view returns (uint256) {
        return Token(token).allowance(owner, address(this));
    }
}

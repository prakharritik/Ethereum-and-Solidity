// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Lottery {

    address public manager;
    address payable[] public players;

    constructor(){
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.01 ether,
            "A minimum payment of .01 ether must be sent to enter the lottery");

        // As of Solidity 0.8.0 the global variable `msg.sender` has the type
        // `address` instead of `address payable`. So we must convert msg.sender
        // into `address payable` before we can add it to the players array.
        players.push(payable(msg.sender));
    }

    function random() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public onlyManager{

        uint index = random()%players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }

    modifier onlyManager(){
        require(msg.sender == manager, "Only owner can call this function.");
        _;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
}
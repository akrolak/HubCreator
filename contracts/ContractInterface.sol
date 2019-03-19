pragma solidity ^0.4.8;

contract ContractInterface {
	function getAddress() public constant returns (address);
	function getValue() public constant returns (uint);
}

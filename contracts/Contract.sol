pragma solidity ^0.4.8;

import "ContractInterface.sol";

contract Contract is ContractInterface {
	uint value;

	function Contract(uint _val) public {
		value = _val;
	}

	function getAddress() public constant returns (address) {
		return this;
	}

	function getValue() public constant returns (uint) {
		return value;
	}
}

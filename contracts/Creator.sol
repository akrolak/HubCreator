pragma solidity ^0.4.8;

import "CreatorInterface.sol";
import "Contract.sol";

contract Creator is CreatorInterface {

	uint internal index = 1;

	function createContract() public returns (address) {
		return new Contract(index++);
	}
}

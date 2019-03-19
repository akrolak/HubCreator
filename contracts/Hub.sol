pragma solidity ^0.4.8;

import "ContractInterface.sol";
import "CreatorInterface.sol";

contract Hub {

	CreatorInterface public cr;
	ContractInterface public contr;

	function registerCreator(address ad) public {
		cr = CreatorInterface(ad);
	}

	function createContract() public {
		if(address(cr) == 0x0) throw;
		contr = ContractInterface(cr.createContract());
	}

	function getContractAddress() constant public returns (address) {
		return contr.getAddress();
	}

	function getContractValue() constant public returns (uint) {
		return contr.getValue();
	}

	function getCreator() constant public returns (address) {
		return address(cr);
	}
}

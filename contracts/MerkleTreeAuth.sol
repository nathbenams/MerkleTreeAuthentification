// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


contract MerkleTreeAuth {

	//Using MerkleProof for bytes32[];
	using MerkleProof for bytes32[];
    bytes32 root;

    constructor(bytes32 _root) {
        root = _root;
    }

    function isAuthorized (bytes32[] memory merkleProof) public view returns(bool res) {
    	return merkleProof.verify(root, keccak256(abi.encodePacked(msg.sender)));
    }
    
    

}
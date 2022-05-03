const { ethers } = require('hardhat');
const { MerkleTree } = require("merkletreejs");

async function main () {

	const accounts = await ethers.getSigners();
	for (let i in accounts) {
  		console.log("addresse numero: "+ i + ": "+ accounts[i].address)
	}
	let accountArray = [];
	for (let i in accounts) {
		accountArray.push(accounts[i].address);
	}
	const leaves = accountArray.map(account => ethers.utils.keccak256(account));

	const tree = new MerkleTree(leaves, ethers.utils.keccak256, { sort: true });
	const treeRoot = tree.getHexRoot();
	
	const mtaContractFactory = await ethers.getContractFactory('MerkleTreeAuth');
	const mtaContract = await mtaContractFactory.deploy(treeRoot);
	await mtaContract.deployed();
	console.log("Contract Address: ",mtaContract.address);
	
}


main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
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
	console.log("array: ", accountArray);
	const leaves = accountArray.map(account => ethers.utils.keccak256(account));
	console.log("leaves: ", leaves);

	const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
	console.log("listAccount:", await provider.listAccounts());

	
	const tree = new MerkleTree(leaves, ethers.utils.keccak256, { sort: true });
	const treeRoot = tree.getHexRoot();
	console.log("root: ", treeRoot);
	
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